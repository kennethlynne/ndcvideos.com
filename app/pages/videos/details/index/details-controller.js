'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('videoDetails', stateFactory('VideoDetails', {
            url: '/videos/{videoId}',
            templateUrl: 'pages/videos/details/index/main-view.html'
        }));
    })
    .controller('VideoDetailsCtrl', function ($scope, $log, $stateParams, VideoRepository, $state) {

        VideoRepository.getById(1).then(function (result) {
                $scope.video = result;
            })
            .catch(function (reason) {
                $state.go('error', {code: 404});
            });

    });