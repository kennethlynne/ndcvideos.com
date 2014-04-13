'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('administrateVideos', stateFactory('Administratevideos', {
      url: '/videos',
      templateUrl: 'states/admin/administrate-videos/index/main-view.html',
      parent: 'admin'
    }));
  })
  .controller('AdministratevideosCtrl', function ($scope, VideoRepository, vimeoAPI) {

    $scope.existingVideos = [];

    VideoRepository.getAll().then(function (videos) {
      $scope.existingVideos = videos;
    });
    $scope.vimeoVideos = [];

    vimeoAPI.getVideos().then(function (videos) {
      $scope.vimeoVideos = videos;
    });


    $scope.deleteVideo = function (video) {

      if (confirm('Are you sure you want to delete the video?')) {
        //Delete from array first, and then from rep?
        video.$delete().then(function (result) {

          var index = $scope.existingVideos.indexOf(video);
          $scope.existingVideos.splice(index, 1);
        });
      }
    };
  });
