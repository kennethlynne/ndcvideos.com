'use strict';

angular.module('ndc')
    .config(function ($stateProvider, $urlRouterProvider, stateFactory) {
        $urlRouterProvider.when('/admin', '/admin/videos');
        $stateProvider.state('admin', stateFactory('Admin', {
            url: '/admin',
            templateUrl: 'pages/admin/index/main-view.html',
            controller: angular.noop
        }));
    });