'use strict';

angular.module('ndc')
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise("/error?code=404");
    });
