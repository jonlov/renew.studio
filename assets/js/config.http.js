/**
 * Config for the router
 */
angular.module('app')
    // Factories 
    .factory('User', ['$resource', 'appConfig',
        function($resource, appConfig) {
            return $resource(appConfig.APIurl + 'user/:username/:param1', {});
        }
    ])
    .factory('Project', ['$resource', 'appConfig',
        function($resource, appConfig) {
            return $resource(appConfig.APIurl + 'project/:id/:param1', {});
        }
    ])
    .factory('Socket', ['$rootScope', '$auth', 'appConfig',
        function($rootScope, $auth, appConfig) {
            return {
                start: function(callback) {
                    if (!appConfig.socket.connected) {
                        io.sails.connect(null, {
                            forceNew: true
                        });
                        return io.socket.on('connection', function() {
                            return io.socket.request({
                                method: 'GET',
                                url: appConfig.APIurl + 'user/me',
                                headers: {
                                    'authorization': 'Bearer ' + $auth.getToken()
                                }
                            }, function(data, jwr) {
                                if (!jwr.error)
                                    $rootScope.user.socketAuth = true;
                                else
                                    $rootScope.user.socketAuth = false;

                                io.socket.on('notification', function(data) {
                                    $rootScope.$broadcast('notification', data);
                                });
                                io.socket.on('connection', function(socket) {
                                    $rootScope.$broadcast('connection', true);
                                });

                                io.socket.on('disconnect', function() {
                                    $rootScope.$broadcast('connection', false);
                                });

                                return callback(data, jwr);
                            });
                        });
                    } else callback('', {});
                },
                disconnect: function() {
                    $rootScope.user.socketAuth = false;
                    if (appConfig.socket.connected) return io.socket.disconnect();
                }
            }
        }
    ])
    .service('getCSRF', ['$injector', function($injector) {
        return function(callback) {
            var $http = $injector.get("$http");
            var CSRF = $http.get('/csrfToken')
                .success(function(data) {
                    return callback(data._csrf);
                });
            return CSRF;
        }
    }])
    .factory('mainInterceptor', ['$q', '$injector', '$timeout', '$location', '$rootScope', 'getCSRF', 'appConfig',
        function($q, $injector, $timeout, $location, $rootScope, getCSRF, appConfig) {
            // var $auth, $state;

            // this trick must be done so that we don't receive
            // `Uncaught Error: [$injector:cdep] Circular dependency found`
            // $timeout(function() {
            // $auth = $injector.get('$auth');
            // $state = $injector.get('$state');
            // });

            return {
                request: function(res) {
                    var deferred = $q.defer();

                    if (res.url.split('/')[1] == 'api' && res.method != 'GET') {
                        getCSRF(function(csrf) {
                            res.headers['x-csrf-token'] = csrf;
                            deferred.resolve(res);
                        });

                    } else deferred.resolve(res);

                    return deferred.promise;
                },
                response: function(res) {
                    if (res.data.user) $rootScope.user.info = res.data.user;
                    if (res.data.connectSocket && !io.socket) {
                        var Socket = $injector.get('Socket');

                        return Socket.start(function(data, jwr) {
                            return $q.when(res);
                        });
                        // return $q.when(res);
                    } else
                        return $q.when(res);
                },
                responseError: function(res) {
                    var $auth = $injector.get('$auth'),
                        $state = $injector.get('$state'),
                        Socket = $injector.get('Socket'),
                        path = $location.path(),
                        pathFolders = path.split('/'),
                        params = path.split('/lockme/')[1],
                        next = params;

                    if (pathFolders[1] !== 'access' && pathFolders[1] !== 'lockme' && pathFolders[1] !== '') next = $location.path();

                    if (res.status == 401) {}

                    if (res.status == 403) {
                        $rootScope.user.info = {};
                        $auth.logout();
                        Socket.disconnect();
                        $state.transitionTo('home', {
                            next: next
                        });
                    }

                    if (res.status == 419) {
                        if ($rootScope.user.isAuthenticated()) $auth.logout();
                        $rootScope.user.info = res.data.user;
                        Socket.disconnect();

                        if (res.data.redirect && path[1] !== 'lockme')
                            $state.transitionTo('lockme', {
                                next: next
                            });
                    }

                    return $q.reject(res);
                }
            };
        }
    ])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('mainInterceptor');

    }])