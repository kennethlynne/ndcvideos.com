    angular.module('ndc')
        .constant('Config', {
            viewsDir:               'views/',
            useMocks:               true,
            API: {
                protocol:           'http',
                host:               'ndc.azurewebsites.net',
                port:               '80',
                path:               '/api',
                fakeDelay:          800
            }
        })
        .config(function (componentFactoryProvider) { componentFactoryProvider.setViewPath(function (componentSnakeName, componentName) {
            return 'components/' + componentSnakeName + '/' + componentSnakeName + '.html';
        })})
        .value('cgBusyTemplateName','views/angular-busy/default-spinner.html');




