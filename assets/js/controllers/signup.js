'use strict';

// signup controller
app.controller('SignupFormController', ['$scope', '$location', '$state', '$auth',
    function($scope, $location, $state, $auth) {
        $scope.user = {};
        $scope.authError = null;

        var decodedNext = decodeURIComponent($state.params.next);

        $scope.signup = function() {
            $scope.authError = null;
            var allEncoded = $scope.user.firstName + '|' +
                $scope.user.lastName + '|' +
                $scope.user.username + '|' +
                $scope.user.email + '|' +
                $scope.user.password + '|' +
                $scope.user.agree,
                pathFolder = '/';

            $auth.signup({
                    0: allEncoded
                })
                .then(function(res) {
                    $auth.setToken(res.data.token);
                    if ($state.params.next) var pathFolder = decodedNext.split('/')[1];

                    if (pathFolder !== '404' && pathFolder !== 'logout' && pathFolder !== 'lockme' && pathFolder !== 'access')
                        $location.path(decodedNext).search({});
                    else
                        $location.path('/').search({});

                })
                .catch(function(res) {
                    $scope.authError = res.data;
                });

            //     // $scope.authError = null;
            //     // // Try to create
            //     // $http.post('api/signup', {
            //     //         name: $scope.user.name,
            //     //         email: $scope.user.email,
            //     //         password: $scope.user.password
            //     //     })
            //     //     .then(function(response) {
            //     //         if (!response.data.user) {
            //     //             $scope.authError = response;
            //     //         } else {
            //     //             $state.go('app.dashboard-v1');
            //     //         }
            //     //     }, function(x) {
            //     //         $scope.authError = 'Server Error';
            //     //     });
        };
    }
]);