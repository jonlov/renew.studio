angular.module('app')
    .directive('uiScrollTo', ['$location', '$anchorScroll', function($location, $anchorScroll) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {
                jQuery.extend(jQuery.easing, {
                    def: 'easeOutQuad',
                    easeInOutExpo: function(x, t, b, c, d) {
                        if (t == 0) return b;
                        if (t == d) return b + c;
                        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
                    }
                });
                el.on('click', function(e) {
                    e.preventDefault();
                    var $target = attr.uiScrollTo;

                    $('html, body').stop().animate({
                        'scrollTop': $($target).offset().top
                    }, 1000, 'easeInOutExpo', function() {
                        window.location.hash = $target;
                    });
                    // $location.hash(attr.uiScrollTo);
                    // $anchorScroll();
                });
            }
        };
    }]);