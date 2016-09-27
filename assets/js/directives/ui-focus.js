angular.module('app')
    .directive('uiFocus', ['$timeout', '$parse',
        function($timeout, $parse) {
            return {
                link: function(scope, el, attr) {
                    var model = $parse(attr.uiFocus);
                    scope.$watch(model, function(value) {
                        if (value === true) {
                            $timeout(function() {
                                el[0].focus();
                            });
                        }
                    });
                }
            };
        }
    ]);