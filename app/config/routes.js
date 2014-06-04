'use strict';

angular.module('ndc')
  .run(function ($rootScope, $location, $window) {
    $rootScope.$on('$stateChangeSuccess', function () {
      if ($window.ga) {
        $window.ga('send', 'pageview', { page: $location.path() });
      }
    });
  })
  .config(function ($urlRouterProvider) {
    $urlRouterProvider.when('', '/app/videos');
    $urlRouterProvider.when('/', '/app/videos');
    $urlRouterProvider.otherwise('/error?code=404');

    //Remove trailing slashes
    $urlRouterProvider.rule(function (injector, location) {
      var origPath = location.path(),
        normalizedPath = origPath.replace(/\/$/, '');
      if (origPath !== normalizedPath) {
        location.replace().path(normalizedPath);
      }
    });
  });
