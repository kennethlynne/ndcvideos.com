'use strict';

angular.module('ndc')
  .config(function ($stateProvider, $urlRouterProvider, stateFactory) {

    $urlRouterProvider.when('/app/admin', '/app/admin/videos');
    $urlRouterProvider.when('/app/admin/', '/app/admin/videos');

    $stateProvider.state('admin', stateFactory('Admin', {
      url: '/admin',
      templateUrl: 'states/admin/main-view.html',
      parent: 'app',
      controller: angular.noop
    }));

  });
