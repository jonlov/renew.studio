app.controller('MusicCtrl', ['$sce', '$scope', '$rootScope', '$ocLazyLoad', '$timeout', '$cookies', 'appConfig',
    function($sce, $scope, $rootScope, $ocLazyLoad, $timeout, $cookies, appConfig) {
        $scope.API = null;
        $scope.active = -1;

        return $ocLazyLoad.load([
            '/js/app/music/theme.css',
            'com.2fdevs.videogular',
            'com.2fdevs.videogular.plugins.controls',
            'com.2fdevs.videogular.plugins.overlayplay',
            'com.2fdevs.videogular.plugins.poster',
            'com.2fdevs.videogular.plugins.buffering'
        ]).then(function() {
            $scope.playerTemplate = '/tpl/blocks/music.player.html';

            $scope.config = {
                repeat: false,
                shuffle: false,
                autoPlay: false,
                theme: {
                    url: "/js/app/music/videogular.css"
                }
            };

            var arrayObjectIndexOf = function(arraytosearch, key, valuetosearch) {
                    for (var i = 0; i < arraytosearch.length; i++) {
                        if (arraytosearch[i][key] == valuetosearch) {
                            return i;
                        }
                    }
                    return -1;
                },
                arraysEqual = function(a, b) {
                    if (a === b) return true;
                    if (a == null || b == null) return false;
                    if (a.length != b.length) return false;

                    // If you don't care about the order of the elements inside
                    // the array, you should sort both arrays here.

                    for (var i = 0; i < a.length; ++i) {
                        if (a[i] !== b[i]) return false;
                    }
                    return true;
                };
            // {
            //     title: 'Esta noche',
            //     artist: 'Loyal',
            //     poster: '/img/b2.jpg',
            //     sources: [{
            //         src: $sce.trustAsResourceUrl('/mp3/Master-esta-noche-loyal.mp3'),
            //         type: 'audio/mpeg'
            //     }]
            // }
            var playerCookie = function() {
                    return $cookies.getObject($scope.app.shortName + '-player');
                },
                player = {
                    list: [],
                    all: function() {
                        return this.list;
                    },
                    current: function() {
                        return $scope.active;
                    },
                    currentState: function() {
                        return $scope.API.currentState;
                    },
                    add: function(source, title, image, url) {
                        var index = arrayObjectIndexOf(this.list, 'url', url),
                            info = {
                                source: source,
                                title: title,
                                image: image,
                                url: url
                            };

                        if (index === -1) {
                            this.list.push(info);
                            $cookies.putObject(scope.app.shortName + '-player-queue', this.list);
                        }
                    },
                    pause: function() {
                        if ($scope.API.currentState == 'play')
                            $scope.API.pause();

                    },
                    toggle: function(array, audioToPlay) {
                       var indexToPlay = array.indexOf(audioToPlay);

                        if (indexToPlay == this.current())
                                $scope.API.playPause();
                        else
                            this.loadList(array, audioToPlay);
                    },
                    loadList: function(array, audioToPlay) {
                        var newArray = [],
                            indexToPlay = array.indexOf(audioToPlay);

                        for (count in array) {
                            var item = array[count];

                            if (item.mp3)
                                newArray.push({
                                    title: item.title,
                                    artist: item.artist,
                                    poster: item.poster,
                                    sources: [{
                                        src: $sce.trustAsResourceUrl(item.mp3),
                                        type: 'audio/mpeg'
                                    }]
                                });
                        }

                        if (!arraysEqual(this.list, newArray)) {
                            this.list = newArray;
                            $scope.play(indexToPlay);
                        }
                    }
                };

            $rootScope.player = player;

            if ($rootScope.player.list >= 1)
                appConfig.settings.hideFooter = false;
            else
                appConfig.settings.hideFooter = true;

            $scope.onPlayerReady = function(API) {
                $scope.API = API;
                if ($scope.API.currentState == 'play' || $scope.isCompleted) $scope.API.play();
                $scope.isCompleted = false;

                $scope.$watch('API.currentState', function(newValue) {
                    if (!$scope.isCompleted) {
                        if (newValue === 'play')
                            $scope.API.autoPlay = true;
                        else
                            $scope.API.autoPlay = false;

                    } else
                        $scope.API.autoPlay = true;

                });

            };

            $scope.onComplete = function() {
                $scope.isCompleted = true;

                var now = $scope.active;

                if ($scope.config.repeat) {
                    $scope.API.seekTime(0);
                    $scope.API.play();

                } else $scope.setActive('next');
            };

            $scope.getRandom = function(index) {
                var i = Math.floor(Math.random() * player.list.length);
                if (!(i - index)) {
                    i = $scope.getRandom(index);
                }
                return i;
            }

            $scope.play = function(index) {
                $scope.setActive(index);

            };

            $scope.setActive = function(index) {
                if ($scope.config.shuffle) {
                    $scope.active = $scope.getRandom($scope.active);

                } else {
                    // get prev or next item
                    if (index == "next")
                        $scope.active++;
                    else if (index == "prev")
                        $scope.active--;
                    else
                        $scope.active = index;

                    if ($scope.active >= player.list.length) $scope.active = 0;
                    if ($scope.active == -1) $scope.active = player.list.length - 1;
                    appConfig.settings.hideFooter = false;
                }

                if ($scope.API.currentState == 'stop' || $scope.API.currentState == 'pause')
                    $scope.API.play();

            };

            $scope.toggleRepeat = function() {
                $scope.config.repeat = !$scope.config.repeat;

                $cookies.putObject($scope.app.shortName + '-player', $scope.config);
            };

            $scope.toggleShuffle = function() {
                $scope.config.shuffle = !$scope.config.shuffle;

                $cookies.putObject($scope.app.shortName + '-player', $scope.config);
            };
        });
    }
]);