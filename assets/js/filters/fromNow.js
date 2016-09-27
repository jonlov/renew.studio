'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
    .filter('fromNow', [function() {
        return function(date) {
            return moment(date).fromNow();
        }
    }])
    .directive('time', [
        '$timeout',
        '$filter',
        function($timeout, $filter) {

            return function(scope, element, attrs) {
                var time = attrs.time,
                    intervalLength = 1000 * 10, // 10 seconds
                    filter = $filter('fromNow'),
                    timeoutId = $timeout(function() {
                        updateTime();
                        updateLater();
                    }, intervalLength);

                function updateTime() {
                    element.text(filter(time));
                }

                function updateLater() {
                    var timeoutId = $timeout(function() {
                        updateTime();
                        updateLater();
                    }, intervalLength);
                }

                element.bind('$destroy', function() {
                    $timeout.cancel(timeoutId);
                });

                updateTime();
                updateLater();
            };

        }
    ]);