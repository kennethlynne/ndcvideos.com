'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('index', stateFactory('Index', {
            url:'/'
        }));
    })
    .controller('IndexCtrl', function ($scope, VideoRepository) {
        VideoRepository.getAll().then(function (videos) {
            $scope.videos = videos;
        });
    });
