'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('videoDetails', stateFactory('Video', {
            url: 'video/{id}',
            views: {
                'modal@': {
                    templateUrl: 'pages/video/videoDetails/modal.html',
                    controller: 'VideoCtrl'
                }
            },
            parent: 'index'
        }));
    })
    .controller('VideoCtrl', function ($scope, $stateParams, $state, VideoRepository, stateHistory) {

        VideoRepository.getById($stateParams.id).then(function (video) {
            $scope.video = video;
        });

        $scope.closeModal = function () {
            stateHistory.back();
        }

    });
