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
    .controller('AdminImportVideoCtrl', function ($scope, TagRepository) {
        
        $scope.tags = []; //This variable holds selected tags

        $scope.select2Options = {
            multiple: true,
            query: function (query) {
                TagRepository.search(query.term).then(function (data) {
                    query.callback({results: data});
                });
            }
        };


    });
