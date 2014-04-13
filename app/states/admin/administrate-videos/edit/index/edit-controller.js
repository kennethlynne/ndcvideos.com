'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('administrateVideosEdit', stateFactory('Edit', {
      url: '/edit/{id}',
      templateUrl: 'states/admin/administrate-videos/edit/index/main-view.html',
      parent: 'administrateVideos'
    }));
  })
  .controller('EditCtrl', function ($scope, TagRepository, $state, $stateParams, VideoRepository) {

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
      video.$save().then(function (result) {
        $state.go('administrateVideos');
      });
    };

    $scope.cancel = function () {
      if (!!confirm('Er du sikker på at du vil forkaste alle data?')) {
        $state.go('administrateVideos');
      }
    }

  });
