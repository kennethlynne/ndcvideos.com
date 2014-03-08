'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('index', stateFactory('Index', {
            url:'/?tags'
        }));
    })
    .controller('IndexCtrl', function ($scope, VideoRepository, $stateParams, _) {


        if($stateParams.tags != null)
        {
            VideoRepository.getByTags($stateParams.tags).then(function (videos) {
                $scope.videos = videos;
            });
        }
        else
        {
            VideoRepository.getAll().then(function (videos) {
                $scope.videos = videos;
            });
        }

    });
