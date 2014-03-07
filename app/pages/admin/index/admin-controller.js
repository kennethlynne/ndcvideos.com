'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('admin', stateFactory('Admin', {
            url:'/admin',
            templateUrl: 'pages/admin/index/main-view.html'
        }));
    })
    .controller('AdminCtrl', function ($scope, init) {
        $scope.data = init;
    });
