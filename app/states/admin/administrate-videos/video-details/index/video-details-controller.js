'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('adminVideoDetails', stateFactory('Videodetails', {
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
      parent: 'administrateVideos'
    }));
  });

