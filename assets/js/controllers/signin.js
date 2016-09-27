'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope', '$rootScope', '$http', '$state',
    '$location', '$auth', '$timeout', 'bsLoadingOverlayService', 'Socket', 'ngDialog',
    function($scope, $rootScope, $http, $state, $location, $auth, $timeout,
        bsLoadingOverlayService, Socket, ngDialog) {

        $scope.authError = null;

        if ($rootScope.user && $rootScope.user.info.username) {
            $scope.username = $rootScope.user.info.username;

        }

        var decodedNext = decodeURIComponent($state.params.next);

        $scope.login = function() {
            $scope.authError = null;
            var allEncoded = $scope.username + '|' + $scope.password,
                pathFolder = '/';

            $scope.loading = true;

            $auth.login({
                    0: allEncoded
                })
                .then(function(res) {
                    Socket.start(function(data, jwr) {
                        if (jwr.error) {
                            $scope.loading = false;
                            $scope.authError = jwr;

                        } else {
                            if ($state.params.next) var pathFolder = decodedNext.split('/')[1];

                            ngDialog.closeAll();

                            $timeout(function() {
                                if (pathFolder && pathFolder !== '404' && pathFolder !== 'logout' && pathFolder !== 'lockme' && pathFolder !== 'access')
                                    return $location.path(decodedNext).search({});
                                else
                                    return $location.path('/').search({});
                            });
                        }

                    });

                })
                .catch(function(res) {
                    $scope.loading = false;

                    $scope.authError = res.data;
                });
        };

        // if (toState.name == 'access.logout') {
        //                event.preventDefault();
        //                $auth.logout();
        //                $state.go('app.project.list');
        //                return;
        //            } 
    }
]);