// lazyload config

angular.module('app')
    /**
     * jQuery plugin config use ui-jq directive , config the js and css files that required
     * key: function name of the jQuery plugin
     * value: array of the css js file located
     */
    .constant('JQ_CONFIG', {
        easyPieChart: ['/bower_components_edited/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'],
        sparkline: ['/bower_components/jquery.sparkline/dist/jquery.sparkline.retina.js'],
        plot: ['/bower_components/flot/jquery.flot.js',
            '/bower_components/flot/jquery.flot.pie.js',
            '/bower_components/flot/jquery.flot.resize.js',
            '/bower_components/flot.tooltip/js/jquery.flot.tooltip.js',
            '/bower_components/flot.orderbars/js/jquery.flot.orderBars.js',
            '/bower_components/flot-spline/js/jquery.flot.spline.js'
        ],
        moment: ['/bower_components/moment/moment.js'],
        chosen: ['/bower_components/chosen/chosen.jquery.min.js',
            '/bower_components/bootstrap-chosen/bootstrap-chosen.css'
        ],
        wysiwyg: ['/bower_components/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
            '/bower_components/bootstrap-wysiwyg/external/jquery.hotkeys.js'
        ],
        fullcalendar: ['/bower_components/moment/moment.js',
            '/bower_components/fullcalendar/dist/fullcalendar.min.js',
            '/bower_components/fullcalendar/dist/fullcalendar.min.css'
        ]
    })
    // oclazyload config
    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        // We configure ocLazyLoad to use the lib script.js as the async loader
        $ocLazyLoadProvider.config({
            debug: false,
            events: false,
            modules: [{
                name: 'truncate',
                files: [
                    '/js/filters/truncate.js'
                ]
            }, {
                name: 'fullPage.js',
                files: [
                    '/bower_components/fullpage.js/dist/jquery.fullpage.min.css',
                    '/bower_components/fullpage.js/dist/jquery.fullpage.js',
                    '/bower_components_edited/angular-fullpage.js/angular-fullpage.js'
                ]
            }, {
                name: 'ui.ace',
                files: [
                    '/bower_components/ace-builds/src-min-noconflict/ace.js',
                    // '/bower_components/ace-builds/src-min-noconflict/ext-language_tools.js',
                    '/bower_components/angular-ui-ace/ui-ace.min.js'
                ]
            }, {
                name: 'ngCart',
                files: ['/bower_components/ngCart/dist/ngCart.min.js']
            }, {
                name: 'ui.grid',
                files: [
                    '/bower_components/angular-ui-grid/ui-grid.min.js',
                    '/bower_components/angular-ui-grid/ui-grid.min.css',
                    '/bower_components/angular-ui-grid/ui-grid.bootstrap.css'
                ]
            }, {
                name: 'ui.select',
                files: [
                    '/bower_components/angular-ui-select/dist/select.min.js',
                    '/bower_components/angular-ui-select/dist/select.min.css'
                ]
            }, {
                name: 'angularFileUpload',
                files: [
                    '/bower_components/angular-file-upload/angular-file-upload.min.js'
                ]
            }, {
                name: 'ui.calendar',
                files: ['/bower_components/angular-ui-calendar/src/calendar.js']
            }, {
                name: 'ngImgCrop',
                files: [
                    '/bower_components/ngImgCrop/compile/minified/ng-img-crop.js',
                    '/bower_components/ngImgCrop/compile/minified/ng-img-crop.css'
                ]
            }, {
                name: 'angularBootstrapNavTree',
                files: [
                    '/bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                    '/bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css'
                ]
            }, {
                name: 'youtube-embed',
                files: [
                    '/bower_components/angular-youtube-mb/dist/angular-youtube-embed.min.js'
                ]
            }, {
                name: 'com.2fdevs.videogular',
                files: [
                    '/bower_components_edited/videogular/videogular.js'
                ]
            }, {
                name: 'com.2fdevs.videogular.plugins.controls',
                files: [
                    '/bower_components_edited/videogular-controls/vg-controls.js'
                ]
            }, {
                name: 'com.2fdevs.videogular.plugins.buffering',
                files: [
                    '/bower_components/videogular-buffering/vg-buffering.min.js'
                ]
            }, {
                name: 'com.2fdevs.videogular.plugins.overlayplay',
                files: [
                    '/bower_components/videogular-overlay-play/vg-overlay-play.min.js'
                ]
            }, {
                name: 'com.2fdevs.videogular.plugins.poster',
                files: [
                    '/bower_components/videogular-poster/vg-poster.min.js'
                ]
            }, {
                name: 'com.2fdevs.videogular.plugins.imaads',
                files: [
                    '/bower_components/videogular-ima-ads/ima-ads.min.js'
                ]
            }]
        });
    }]);