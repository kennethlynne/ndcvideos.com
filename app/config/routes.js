'use strict';

angular.module('ndc')
  .config(function ($urlRouterProvider) {
    $urlRouterProvider.when('', '/app/videos');
    $urlRouterProvider.when('/', '/app/videos');
    $urlRouterProvider.otherwise("/error?code=404");
  });
