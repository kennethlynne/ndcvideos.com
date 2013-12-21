'use strict';

angular.module('ndcApp')
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise("/error?code=404");
    });
