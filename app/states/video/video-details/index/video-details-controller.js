'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('videoDetails', stateFactory('Videodetails', {
      url: '/video/{id}',
      views: {
        'slideOut@app': {
          templateUrl: 'states/video/video-details/index/slide-out-view.html',
          controller: 'VideodetailsCtrl'
        }
      },
      parent: 'videos'
    }));
  })
  .controller('VideodetailsCtrl', function ($scope, $stateParams, $state, VideoRepository, stateHistory) {

    VideoRepository.getById($stateParams.id).then(function (video) {
      $scope.video = video;
    });

    $scope.close = function () {
      stateHistory.back();
    }

  });
