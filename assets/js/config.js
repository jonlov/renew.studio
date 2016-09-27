// config

var app =
    angular.module('app')
    .constant('appConfig', {
        firstName: 'Renew',
        lastName: 'Creative Studio',
        name: function() {
            return this.firstName + ' ' + this.lastName
        },
        shortName: 'R',
        version: '0.0.1',
        APIurl: '/api/',
        // for chart colors
        color: {
            primary: '#FA7A21',
            info: '#23b7e5',
            success: '#27c24c',
            warning: '#fad733',
            danger: '#f05050',
            light: '#e8eff0',
            dark: '#3a3f51',
            black: '#1c2b36'
        },
        settings: {
            themeID: 7,
            navbarHeaderColor: '',
            navbarCollapseColor: '',
            asideColor: 'bg-black-opacity-60',

            headerFixed: true,
            asideFixed: true,
            asideFolded: true,
            asideDock: false,
            container: false,

            showAside: false,
            showHeader: false,
            showFooter: false
        },
        noHeader: ['lockme', 'construction'],
        noFooter: ['construction'],
        paypal: { business: '9AXXQDURXWPRE', item_number: '12', currency_code: 'AUD' },
        socket: {
            connected: false
        }
        // paypal: { business: 'H7CW8KYZXJHDQ', item_number: '12', currency_code: 'AUD' }

    })
    .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$authProvider', 'appConfig',
        function($controllerProvider, $compileProvider, $filterProvider, $provide, $authProvider, appConfig) {

            // lazy controller, directive and service
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.constant = $provide.constant;
            app.value = $provide.value;


            $authProvider.tokenPrefix = 'RN';
            $authProvider.signupUrl = appConfig.APIurl + '/user';
            $authProvider.loginUrl = appConfig.APIurl + '/user/signin';

        }
    ])
    .config(['$translateProvider', function($translateProvider) {
        // Register a loader for the static files
        // So, the module will search missing translation tables under the specified urls.
        // Those urls are [prefix][langKey][suffix].
        $translateProvider.useStaticFilesLoader({
            prefix: '/l10n/',
            suffix: '.js'
        });
        // Tell the module what language to use by default
        $translateProvider.preferredLanguage('en');
        // Tell the module to store the language in the local storage
        $translateProvider.useLocalStorage();
    }]);