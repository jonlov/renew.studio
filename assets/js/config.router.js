'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(['$window', '$rootScope', '$state', '$stateParams', '$auth', '$http', 'appConfig', '$timeout', 'User', 'bsLoadingOverlayService', 'Socket',
        function($window, $rootScope, $state, $stateParams, $auth, $http, appConfig, $timeout, User, bsLoadingOverlayService, Socket) {
            bsLoadingOverlayService.setGlobalConfig({
                delay: 100, // Minimal delay to hide loading overlay in ms.
                activeClass: undefined, // Class that is added to the element where bs-loading-overlay is applied when the overlay is active.
                templateUrl: '/tpl/blocks/loader.html' // Template url for overlay element. If not specified - no overlay element is created.
            });

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            var isAuthenticated = $auth.isAuthenticated;

            $rootScope.user = {
                info: {},
                userToken: $window.localStorage[appConfig.shortName + '_token'],
                socketAuth: false
            };

            $rootScope.user.isAuthenticated = isAuthenticated;

            $rootScope.$on('connection', function(e, connected) {
                if (connected) {
                    User.get({
                        username: 'me'
                    }, function() {});
                    $rootScope.noConnection = false;
                    appConfig.socket.connected = false;

                } else {
                    $rootScope.noConnection = true;
                    appConfig.socket.connected = false;
                }
            });

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                // FOR PAGES WITHOUT HEADER
                var noHeader = appConfig.noHeader;
                if (noHeader.indexOf(toState.name) + 1) appConfig.settings.hideHeader = true;
                else appConfig.settings.hideHeader = false;

                // FOR PAGES WITHOUT FOOTER
                // var noFooter = appConfig.noFooter;
                // if (noFooter.indexOf(toState.name) + 1) appConfig.settings.hideFooter = true;
                // else appConfig.settings.hideFooter = false;

                // Check if it is logged
                if (isAuthenticated())
                    User.get({
                        username: 'me',
                        redirect: false
                    }, function() {});

                var prevent = event.preventDefault,
                    name = toState.name,

                    // any public action is allowed
                    noLoggedUsers = angular.isObject(toState.data) && toState.data.noLoggedUsers === true,
                    noNeedAuth = angular.isObject(toState.data) && toState.data.noNeedAuth === true,
                    needUserInfo = angular.isObject(toState.data) && toState.data.needUserInfo === true;

                if (name === 'access.logout') {
                    User.get({
                        username: 'logout'
                    }, function() {
                        $auth.logout();
                        Socket.disconnect();
                        // return $state.go('access.signin');
                    });
                }

                if (toState.data && toState.data.showAside != undefined)
                    appConfig.settings.showAside = toState.data.showAside;
                else
                    appConfig.settings.showAside = false;

                if (noNeedAuth) return;
                if (!$rootScope.user.isAuthenticated() && !$rootScope.user.info.username && noLoggedUsers) return;
                if ($rootScope.user.isAuthenticated() && $rootScope.user.info.username && !noLoggedUsers) return;
                if (needUserInfo && $rootScope.user.info.username) return;
                if ($rootScope.user.isAuthenticated() && $rootScope.user.info.username) return;

                prevent();
                $timeout(function() {
                    User.get({
                        username: 'me'
                    }, function() {
                        return $state.go(toState, toParams);
                    });
                });
            });

            $rootScope.$on('$stateChangeSuccess', function() {
                // Page Title
                if ($state.current.data && $state.current.data.title) document.title = $state.current.data.title + ' | ' + appConfig.name();
                else document.title = appConfig.name() + ' | The Official Site';
            });
        }
    ])
    .config(
        ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'JQ_CONFIG',
            function($stateProvider, $urlRouterProvider, $locationProvider, JQ_CONFIG) {

                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false
                });

                $stateProvider
                    .state('home', {
                        url: '/',
                        templateUrl: '/tpl/default/blank.html',
                        data: {
                            noNeedAuth: true
                        },
                        controller: ['$auth', '$state', '$rootScope',
                            function($auth, $state, $rootScope) {
                                if ($rootScope.user.isAuthenticated() || $rootScope.user.info.username)
                                    return $state.go('project.list');
                                else
                                // return $state.go('construction')
                                    return $state.go('construction');
                            }
                        ]
                    })
                    .state('construction', {
                        url: '/construction',
                        templateUrl: '/tpl/default/page_construction.html',
                        data: {
                            noNeedAuth: true
                        }
                    })
                    .state('about', {
                        url: '/about?url',
                        templateUrl: '/tpl/default/page_about.html',
                        data: {
                            noNeedAuth: true
                        },
                        resolve: {
                            deps: ['uiLoad', '$ocLazyLoad',
                                function(uiLoad, $ocLazyLoad) {
                                    return uiLoad.load(['https://www.youtube.com/iframe_api',
                                            '/js/app/construction/construction.js',
                                            '/bower_components/animate.css/animate.min.css',
                                            '/bower_components/jquery_appear/jquery.appear.js',
                                            '/js/directives/ui-appear.js',
                                            '/js/app/about/AboutController.js'
                                        ])
                                        .then(function() {
                                            return $ocLazyLoad
                                                .load([
                                                    'youtube-embed',
                                                    'fullPage.js'
                                                ]);
                                        });
                                }
                            ]
                        }
                    })
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class="m-b-xxl"></div>'
                    })
                    // .state('access.signin', {
                    //     url: '/signin/:next',
                    //     templateUrl: '/tpl/default/page_signin.html',
                    //     data: {
                    //         noLoggedUsers: true
                    //     },
                    //     resolve: {
                    //         deps: ['uiLoad',
                    //             function(uiLoad) {
                    //                 return uiLoad.load(['/js/controllers/signin.js']);
                    //             }
                    //         ]
                    //     }
                    // })
                    .state('access.signup', {
                        url: '/signup/:next',
                        templateUrl: '/tpl/default/page_signup.html',
                        // data: {
                        //     noLoggedUsers: true
                        // },
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['/js/controllers/signup.js']);
                                }
                            ]
                        }
                    })
                    .state('access.logout', {
                        url: '/logout',
                        templateUrl: '/tpl/default/blank.html'
                    })
                    .state('access.forgotpwd', {
                        url: '/forgotpwd',
                        templateUrl: '/tpl/default/page_forgotpwd.html',
                        data: {
                            noNeedAuth: true
                        }
                    })
                    .state('lockme', {
                        url: '/lockme/:next',
                        templateUrl: '/tpl/default/page_lockme.html',
                        data: {
                            needUserInfo: true
                        },
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['/js/controllers/signin.js']);
                                }
                            ]
                        }
                    })

                .state('payments', {
                        abstract: true,
                        url: '/payments',
                        data: {
                            title: 'Payments'
                        },
                        views: {
                            '': {
                                templateUrl: '/tpl/payments/page_payments.html'
                            }
                        }
                    })
                    .state('payments.checkout', {
                        data: {
                            noNeedAuth: true
                        },
                        url: '/checkout',
                        templateUrl: '/tpl/payments/checkout.html'
                    })
                    .state('payments.success', {
                        url: '/success',
                        templateUrl: '/tpl/payments/success.html'
                    })
                    .state('payments.cancel', {
                        url: '/cancel',
                        templateUrl: '/tpl/payments/cancel.html'
                    })

                .state('settings', {
                        abstract: true,
                        url: '/settings',
                        data: {
                            title: 'Settings'
                        },
                        views: {
                            '': {
                                templateUrl: '/tpl/settings/page_settings.html'
                            }
                        },
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['/js/app/settings/settings.js']);
                                }
                            ]
                        }
                    })
                    .state('settings.overview', {
                        url: '/overview',
                        templateUrl: '/tpl/settings/overview.html'
                    })
                    .state('settings.privacy', {
                        url: '/privacy',
                        templateUrl: '/tpl/settings/privacy.html'
                    })

                // project
                .state('project', {
                        abstract: true,
                        url: '/project',
                        data: {
                            title: 'Projects'
                        },
                        template: '<div class="h-full" ui-view></div>',
                        // use resolve to load other dependences
                        resolve: {
                            deps: ['uiLoad', '$ocLazyLoad',
                                function(uiLoad, $ocLazyLoad) {
                                    return $ocLazyLoad.load(['truncate', 'ui.ace'])
                                        .then(function() {
                                            return uiLoad.load(['/js/app/project/project.js',
                                                '/js/app/project/project-service.js',
                                                JQ_CONFIG.moment
                                            ]);
                                        });
                                }
                            ]
                        }
                    })
                    .state('project.list', {
                        url: '',
                        templateUrl: '/tpl/project/project.list.html'
                    })
                    .state('project.preview', {
                        url: '/:projectId',
                        templateUrl: '/tpl/project/project.preview.html'
                    })
                    .state('project.edit', {
                        data: {
                            showAside: true
                        },
                        url: '/:projectId/edit',
                        templateUrl: '/tpl/project/project.edit.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                        function() {
                                            return $ocLazyLoad.load('/js/controllers/tree.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('project.compose', {
                        url: '/compose',
                        templateUrl: '/tpl/project/project.new.html'
                    })
                    .state('profile', {
                        url: "/:username",
                        data: {
                            noNeedAuth: true
                        },
                        controller: ['$scope', '$stateParams',
                            function($scope, $stateParams) {
                                var toCtrl = $stateParams.toCtrl,
                                    name;

                                if (toCtrl !== 'sameUser') {
                                    $scope.profile = {};

                                    for (name in toCtrl) {
                                        $scope.profile[name] = toCtrl[name];
                                    }
                                }
                            }
                        ],
                        templateProvider: function($state, $stateParams, $templateFactory, $rootScope, User) {
                            var username = $stateParams.username,
                                isAuthenticated = $rootScope.user.isAuthenticated;

                            if (isAuthenticated() && username == $rootScope.user.info.username) {
                                $stateParams.toCtrl = $rootScope.user.info;
                                return $templateFactory.fromUrl('/tpl/default/page_profile.html');
                            } else
                                return User.get({
                                    username: 'profile',
                                    param1: username
                                }).$promise.then(function(res) {
                                    if (isAuthenticated() && res.sameUser) {
                                        $stateParams.toCtrl = $rootScope.user.info;
                                        return $templateFactory.fromUrl('/tpl/default/page_profile.html');
                                    } else {
                                        $stateParams.toCtrl = res.profile;
                                        return $templateFactory.fromUrl('/tpl/default/page_profile.html');
                                    }

                                }).catch(function(err) {
                                    $stateParams.toCtrl = {};
                                    return $templateFactory.fromUrl('/tpl/default/page_404.html');
                                });

                            // async service to get template name from DB
                            // User
                            //     .get({
                            //         id: username
                            //     })
                            //     // now we have a name
                            //     .then(function(obj) {
                            //         // return $http
                            //         //     // let's ask for a template
                            //         //     .get(obj.templateName)
                            //         //     .then(function(tpl) {
                            //         // haleluja... return template
                            //         return ' tpl.data';
                            //         // });
                            //     })
                            //     .catch(function() {
                            //         return ' tpl.data';

                            //     });

                        }
                    });
            }
        ]
    );