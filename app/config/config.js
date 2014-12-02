'use strict';

angular.module('ndc')
  .constant('Config', angular.deepExtend({
    viewsDir: 'views/',
    componentsDir: 'components/',
    statesDir: 'states/',
    environment: 'production', //development or production
    API: {
      protocol: 'http',
      host: 'api.ndcvideos.com',
      port: String(80),
      path: '/api'
    }
  }, angular._localConfig || {}))
  .config(function (componentFactoryProvider) {
    componentFactoryProvider.setViewPath(function (componentSnakeName) {
      return 'components/' + componentSnakeName + '/' + componentSnakeName + '.html';
    });
  })
  .value('cgBusyTemplateName', 'views/angular-busy/default-spinner.html')
  .factory('BaseUrl', function (Config) {
    return (Config.API.protocol + '://' + Config.API.host + ':' + Config.API.port + '/');
  })
  .factory('APIBaseUrl', function (Config) {
    return (Config.API.protocol + '://' + Config.API.host + ':' + Config.API.port + Config.API.path + '/');
  })
  .value('cgBusyDefaults', {
    message: 'Loading Stuff',
    backdrop: false,
    templateUrl: 'views/angular-busy/default-spinner.html',
    delay: 300,
    minDuration: 700
  })
  .config(function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
  })
  .value('DefaultPaginatorTemplate', 'views/ng-paginator-plz/custom-paginator.html');
