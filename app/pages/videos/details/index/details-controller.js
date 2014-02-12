'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('videoDetails', stateFactory('Details', {
            url: '/videos/{videoId}',
            templateUrl: 'pages/videos/details/index/main-view.html'
        }));
    })
    .controller('VideoDetailsCtrl', function ($scope, $stateParams, VideoRepository, $state) {

        VideoRepository.getById($stateParams.videoId)
            .then(function (result) {
                $scope.video = result;
            })
            .catch(function (reason) {
                $state.go('error', {code: 404});
            })
    });