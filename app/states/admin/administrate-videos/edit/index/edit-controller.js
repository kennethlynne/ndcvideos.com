'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('administrateVideosEdit', stateFactory('EditVideo', {
      url: '/edit/{id}',
      views: {
        'modal@app': {
          templateUrl: 'states/admin/administrate-videos/edit/index/modal.html',
          controller: 'EditVideoCtrl'
        }
      },
      parent: 'administrateVideos',
      onEnter: function () {
        //TODO: Hacky, should be refactored into a directive and/or a service
        angular.element('body').addClass('detail-view-open');
      },
      onExit: function () {
        //TODO: Hacky, should be refactored into a directive and/or a service
        angular.element('body').removeClass('detail-view-open');
      }
    }));
  })
  .controller('EditVideoCtrl', function ($scope, TagRepository, $state, $stateParams, VideoRepository) {

    VideoRepository.getById($stateParams.id).then(function (video) {
      $scope.video = video;
    });

    $scope.select2Options = {
      multiple: true,
      query: function (query) {
        TagRepository.search(query.term).then(function (data) {
          query.callback({results: data});
        });
      }
    };

    $scope.saveChanges = function (video) {
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
