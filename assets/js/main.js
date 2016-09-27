'use strict';

angular.module('app')
    // Controllers 
    .controller('AppCtrl', ['$scope', '$translate', '$window', '$http', '$rootScope', 'appConfig', 'ngDialog', '$ocLazyLoad',
        function($scope, $translate, $window, $http, $rootScope, appConfig, ngDialog, $ocLazyLoad) {
            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            isIE && angular.element($window.document.body).addClass('ie');
            isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

            // config
            $scope.app = appConfig;

            // angular translate
            $scope.lang = {
                isopen: false
            };

            $scope.langs = {
                en: 'English',
                de_DE: 'German',
                it_IT: 'Italian'
            };

            $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || 'English';

            $scope.setLang = function(langKey, $event) {
                // set the current lang
                $scope.selectLang = $scope.langs[langKey];
                // You can change the language during runtime
                $translate.use(langKey);
                $scope.lang.isopen = !$scope.lang.isopen;
            };

            function isSmartDevice($window) {
                // Adapted from http://www.detectmobilebrowsers.com
                var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
            }

            $scope.background = function() {
                return '/img/bg/bg01.png';
            }

            $scope.headUrl = function() {
                if ($rootScope.user.info.username && $rootScope.user.socketAuth)
                    return '/tpl/blocks/header.user.html';
                else
                    return '/tpl/blocks/header.guest.html';
            }

            $scope.loginModal = function() {
                return $ocLazyLoad
                    .load(['/js/controllers/signin.js'])
                    .then(function() {
                        return ngDialog.open({
                            template: '/tpl/default/page_signin.html',
                            className: 'ngdialog-theme-plain'
                        });
                    });
            };

            $scope.notifications = [];
            $scope.$on('notification', function(event, data) {
                $scope.notifications.push(data);
                $scope.$digest();
            });

            $scope.img = '/img/renew-bulb.png';
        }
    ]);