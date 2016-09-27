/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFiles = {
    inject: [
        'bower_components/font-awesome/css/font-awesome.min.css',
        'bower_components/simple-line-icons/css/simple-line-icons.css'
    ],
    concat: [
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/animate.css/animate.css',
        'bower_components_edited/ng-dialog/css/ngDialog.min.css',
        'bower_components_edited/ng-dialog/css/ngDialog-theme-plain.css',
        'css/font.css',
        'css/app.css'
    ]
};

// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFiles = {
    inject: [],
    concat: [
        // jQuery
        'bower_components/jquery/dist/jquery.min.js',

        // Angular
        'bower_components/angular/angular.min.js',

        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-cookies/angular-cookies.min.js',
        'bower_components/angular-resource/angular-resource.min.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js',
        'bower_components/angular-touch/angular-touch.min.js',

        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        
        'bower_components_edited/ngstorage/ngStorage.js',
        'bower_components/ngCart/dist/ngCart.min.js',
        'bower_components_edited/ng-dialog/js/ngDialog.min.js',
        
        'bower_components/angular-ui-utils/ui-utils.min.js',

        'js/sails.io.js',

        // bootstrap
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        // lazyload
        'bower_components/oclazyload/dist/ocLazyLoad.min.js',
        // translate
        'bower_components/angular-translate/angular-translate.min.js',
        'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
        'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
        'bower_components/angular-translate-storage-local/angular-translate-storage-local.min.js',
        
        'bower_components_edited/angular-loading-overlay/dist/angular-loading-overlay.js',

        // satellizer
        'bower_components_edited/satellizer/satellizer.js',

        // App
        'js/app.js',
        'js/config.js',
        'js/config.lazyload.js',
        'js/config.http.js',
        'js/config.router.js',
        'js/main.js',

        'js/services/ui-load.js',
        
        'js/filters/fromNow.js',

        'js/directives/setnganimate.js',
        'js/directives/ui-butterbar.js',
        'js/directives/ui-focus.js',
        'js/directives/ui-fullscreen.js',
        'js/directives/ui-jq.js',
        'js/directives/ui-module.js',
        'js/directives/ui-nav.js',
        'js/directives/ui-scroll.js',
        'js/directives/ui-shift.js',
        'js/directives/ui-toggleclass.js',

        'js/controllers/bootstrap.js',
        'js/app/music/ctrl.js'
        // Lazy loading

        // Dependencies like jQuery, or Angular are brought in here
        // 'js/dependencies/**/*.js',

        // All of the rest of your client-side js files
        // will be injected here in no particular order.
        // 'js/**/*.js'
    ]
};


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
    'templates/**/*.html'
];

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)

// 
// CSS FILES 
// 
module.exports.cssFilesToInject = cssFiles.inject.map(function(path) {
    return '.tmp/public/' + path;
});

module.exports.cssFilesToConcat = cssFiles.concat.map(function(path) {
    return '.tmp/public/' + path;
});

module.exports.cssFilesToConcatProd = cssFiles.concat.map(function(path) {
    return 'assets/' + path;
});


// 
// JS FILES 
//
module.exports.jsFilesToInject = jsFiles.inject.map(function(path) {
    return '.tmp/public/' + path;
});

module.exports.jsFilesToConcat = jsFiles.concat.map(function(path) {
    return '.tmp/public/' + path;
});

module.exports.jsFilesToConcatProd = jsFiles.concat.map(function(path) {
    return 'assets/' + path;
});

// 
// COPY FILES 
//
var assetsFilesToCopy = ['**/*.!(coffee|less)'];
jsFiles.concat.map(function(path) {
    assetsFilesToCopy.push('!' + path);
});

module.exports.assetsFilesToCopy = assetsFilesToCopy;


// 
// TEMPLATE FILES 
//
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
    return 'assets/' + path;
});