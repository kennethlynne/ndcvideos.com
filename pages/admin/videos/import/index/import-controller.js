'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('administrateVideos.import', stateFactory('Import', {
            url: '/videos/import',
            templateUrl: 'pages/admin/videos/import/index/main-view.html',
            parent: 'admin',
            controller: 'AdminImportVideoCtrl'
        }));
    })
    .controller('AdminImportVideoCtrl', function ($scope) {
        
        $scope.select2Options = {
            tags:["red", "green", "blue"]
        };

    });
