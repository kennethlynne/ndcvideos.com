'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('videoDetails', stateFactory('Videodetails', {
      url: '/{id}',
      resolve: {
        scrollLock: ['scrollLock', function (sl) {
          return sl;
        }]
      },
      views: {
        'slideOut@app': {
          templateUrl: 'states/video/video-details/index/slide-out-view.html',
          controller: 'VideodetailsCtrl'
        }
      },
      onEnter: ['scrollLock', function (sl) {
        sl.enable();
      }],
      onExit: ['scrollLock',function (sl) {
        sl.disable();
      }],
      parent: 'videos'
    }));
  })
  .controller('VideodetailsCtrl', function ($scope, $stateParams, $state, VideoRepository, stateHistory) {

    VideoRepository.getById($stateParams.id).then(function (video) {
      $scope.video = video;
    });

    $scope.close = function () {
      stateHistory.back();
    };

  });
