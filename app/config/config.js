angular.module('ndc')
    .constant('Config', {
        viewsDir: 'views/',
        componentsDir: 'components/',
        pagesDir: 'pages/',
        API: {
            useMocks: true,
            protocol: 'http',
            host: 'ndc.azurewebsites.net',
            port: '80',
            path: '/api',
            fakeDelay: 800
        }
    })
    .config(function (componentFactoryProvider, $sceDelegateProvider) {
        componentFactoryProvider.setViewPath(function (componentSnakeName, componentName) {
            return 'components/' + componentSnakeName + '/' + componentSnakeName + '.html';
        })

        //TODO: OMG NONO REMOVE BE$ PROUDUCITON
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            '**'
        ]);
    })
    .value('cgBusyTemplateName', 'views/angular-busy/default-spinner.html')
    .factory('APIBaseUrl', function (Config) {
        return (Config.API.protocol + '://' + Config.API.host + ':' + Config.API.port + Config.API.path + '/');

    })
    .factory('BaseUrl', function (Config) {
        return (Config.API.protocol + '://' + Config.API.host + ':' + Config.API.port + '/');
    });




