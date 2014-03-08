'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('administrateVideos', stateFactory('AdminVideos', {
            url: '/videos',
            templateUrl: 'pages/admin/videos/index/admin-view.html',
            parent: 'admin'
        }));
    })
    .controller('AdminVideosCtrl', function ($scope, VideoRepository, vimeoAPI, $modal) {

        $scope.existingVideos = [];

        VideoRepository.getAll().then(function (videos) {
            $scope.existingVideos = videos;
        });
        $scope.vimeoVideos = [];

        vimeoAPI.getVideos().then(function (videos) {
            $scope.vimeoVideos = videos;
        });

    });
