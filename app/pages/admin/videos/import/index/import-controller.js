'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('administrateVideos.import', stateFactory('Import', {
            url: '/videos/import',
            templateUrl: 'pages/admin/videos/import/index/main-view.html',
            parent: 'admin'
        }));
    })
    .controller('ImportCtrl', function ($scope) {
        $scope.foo = 'bar';
    });
