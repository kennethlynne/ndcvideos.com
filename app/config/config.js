    angular.module('ndc')
        .constant('Config', {
            viewsDir:               'views/',
            componentsDir:          'components/',
            useMocks:               true,
            API: {
                protocol:           'http',
                host:               'ndc.azurewebsites.net',
                port:               '80',
                path:               '/api',
                fakeDelay:          800
            }
        })
        .config(function (componentFactoryProvider, $sceDelegateProvider) { componentFactoryProvider.setViewPath(function (componentSnakeName, componentName) {
            return 'components/' + componentSnakeName + '/' + componentSnakeName + '.html';})

            $sceDelegateProvider.resourceUrlWhitelist([
                'self',
                '**' //TODO: Temporary catch all for all URLS.
            ]);
        })
        .value('cgBusyTemplateName','views/angular-busy/default-spinner.html')
        .run(function(editableOptions) {editableOptions.theme = 'bs3'});




