'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('videoDetails', stateFactory('Video', {
            url: '/video/{id}',
            views: {
                'modal@': {
                    templateUrl: 'pages/video/index/modal.html',
                    controller: 'VideoCtrl'
                }
            }
        }));
    })
    .controller('VideoCtrl', function ($scope, $stateParams, VideoRepository) {

        VideoRepository.getById($stateParams.id).then(function (video) {
            $scope.video = video;
        });

    });
