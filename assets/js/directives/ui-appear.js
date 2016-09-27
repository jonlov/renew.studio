angular.module('app')
    .directive('uiAppear', [function() {
        return {
            restrict: 'A',
            link: function(scope, el, attr) {
                el.addClass('invisible')
                    .appear()
                    .on('appear', function() {
                        var $ani = (attr.animation || 'fadeIn'),
                            $delay;
                        if (!el.hasClass('animated')) {
                            $delay = attr.delay || 0;
                            setTimeout(function() {
                                el.removeClass('invisible').addClass($ani + " animated");
                            }, $delay);
                        }
                    });
            }
        };
    }]);