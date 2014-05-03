'use strict';

angular.module('ndc')
  .constant('Config', angular.deepExtend({
    viewsDir: 'views/',
    componentsDir: 'components/',
    statesDir: 'states/',
    environment: 'production', //development or production
    API: {
//      protocol: 'http', //Use the same protocol, host and port as the UI is hosted from bu default
//      host: 'ndcapi.jit.su',
//      port: String(80),
//      path: '/api'
      protocol: 'http', //Use the same protocol, host and port as the UI is hosted from bu default
      host: 'localhost',
      port: String(1337),
      path: '/api'
    }
  }, angular._localConfig || {}))
  .config(function (componentFactoryProvider) {
    componentFactoryProvider.setViewPath(function (componentSnakeName, componentName) {
      return 'components/' + componentSnakeName + '/' + componentSnakeName + '.html';
    })
  })
  .value('cgBusyTemplateName', 'views/angular-busy/default-spinner.html')
  .factory('BaseUrl', function (Config) {
    return (Config.API.protocol + '://' + Config.API.host + ':' + Config.API.port + '/');
  })
  .factory('APIBaseUrl', function (Config) {
    return (Config.API.protocol + '://' + Config.API.host + ':' + Config.API.port + Config.API.path + '/');
  });
