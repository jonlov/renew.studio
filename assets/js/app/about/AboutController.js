app.controller('AboutController', ['$scope', '$rootScope', 'appConfig',
    function($scope, $rootScope, appConfig) {

        $scope.mainOptions = {
            sectionsColor: ['#000', '#000', '#7BAABE', '#000'],
            anchors: ['home', 'services', 'projects', 'renew'],
            menu: '#menu',
            scrollOverflow: true,
            scrollingSpeed: 1000,
            lockAnchors: true,
            onLeave: function(index, nextIndex, direction) {
                if (nextIndex == 1) appConfig.settings.showHeader = false;
                else appConfig.settings.showHeader = true;
                
                $rootScope.$digest();
            }
        }

        // $.fn.fullpage.silentMoveTo($stateParams.section);
        $scope.section1 = {
            video: 'fpViZkhpPHk',
            player: null,
            vars: {
                autoplay: 1, // Auto-play the video on load
                controls: 0, // Show pause/play buttons in player
                showinfo: 0, // Hide the video title
                modestbranding: 1, // Hide the Youtube Logo
                loop: 1, // Run the video in a loop
                fs: 0, // Hide the full screen button
                cc_load_policy: 0, // Hide closed captions
                iv_load_policy: 3, // Hide the Video Annotations
                autohide: 0, // Hide video controls when playing
                start: 33,
                rel: 0 // Hide related videos
            }
        };

        $scope.$on('youtube.player.ready', function($event, player) {
            vidRescale();

            player.mute();
            // player.stopVideo();
            // player.seekTo(33);

            setTimeout(function() {
                // player.playVideo();
                $scope.playerReady = true;
            }, 200);

            function vidRescale() {

                var w = $(window).width() + 200,
                    h = $(window).height() + 300;

                if (w / h > 16 / 9) {
                    player.setSize(w, w / 16 * 9);
                    $('.tv .screen').css({
                        'left': '0px'
                    });
                } else {
                    player.setSize(h / 9 * 16, h);
                    $('.tv .screen').css({
                        'left': -($('.tv .screen').outerWidth() - w) / 2
                    });
                }
            }

            $(window).on('load resize', function() {
                vidRescale();
            });
        });

        $scope.$on('youtube.player.ended', function($event, player) {
            if (player === $scope.section1.player) {
                player.seekTo(33);

            }
        });
    }
]);