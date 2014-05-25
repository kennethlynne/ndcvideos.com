'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('administrateVideosEdit', stateFactory('EditVideo', {
      url: '/edit/{id}',
      resolve: {
        scrollLock: ['scrollLock', function (sl) {
          return sl;
        }]
      },
      views: {
        'modal@app': {
          templateUrl: 'states/admin/administrate-videos/edit/index/modal.html',
          controller: 'EditVideoCtrl'
        }
      },
      parent: 'administrateVideos',
      onEnter: ['scrollLock', function (sl) {
        sl.enable();
      }],
      onExit: ['scrollLock', function (sl) {
        sl.disable();
      }]
    }));
  })
  .controller('EditVideoCtrl', function ($scope, TagRepository, $state, $stateParams, VideoRepository, Select2) {

    VideoRepository.getById($stateParams.id).then(function (video) {
      $scope.video = video;
    });

    $scope.select2Options = Select2.tagSearch;

    $scope.saveChanges = function (video) {

      if (video.tags.length > 0) {

        _.forEach(video.tags, function (item) {

          if (item.id && item.id.substr(0, 1) == '$')
            delete item.id;
        });

      }

      video.$save().then(function () {
        $state.go('administrateVideos');
      });

    };

    $scope.cancel = function () {
      if (!!confirm('Er du sikker på at du vil forkaste alle data?')) {
        $state.go('administrateVideos');
      }
    };

  });
