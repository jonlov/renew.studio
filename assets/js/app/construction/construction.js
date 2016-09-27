app
    .controller('ConstructionCtrl', ['$scope', '$http', '$filter',
        function($scope, $http, $filter) {
            $scope.videoID = 'fpViZkhpPHk';
            $scope.playerVars = {
                autoplay: 0, // Auto-play the video on load
                controls: 0, // Show pause/play buttons in player
                showinfo: 0, // Hide the video title
                modestbranding: 1, // Hide the Youtube Logo
                loop: 1, // Run the video in a loop
                fs: 0, // Hide the full screen button
                cc_load_policy: 0, // Hide closed captions
                iv_load_policy: 3, // Hide the Video Annotations
                autohide: 0, // Hide video controls when playing
                // start: 32
                rel: 0 // Hide related videos
            };
            $scope.$on('youtube.player.ready', function($event, player) {
                    vidRescale();
                
                player.mute();
                // player.stopVideo();
                player.seekTo(33);

                setTimeout(function() {
                    player.playVideo();

                }, 100)


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
            $scope.$on('youtube.player.stateChange', function($event, player) {

                if (event.data == YT.PlayerState.ENDED) {
                    player.seekTo(33);

                }
            });
        }
    ]);