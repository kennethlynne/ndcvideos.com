'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('administrateVideos', stateFactory('Administratevideos', {
      url: '/videos',
      templateUrl: 'states/admin/administrate-videos/index/main-view.html',
      parent: 'admin'
    }));
  })
  .controller('AdministratevideosCtrl', function ($scope, VideoRepository) {

    $scope.promise = VideoRepository.getAll().then(function (videos) {
      $scope.videos = videos;
    });

    $scope.deleteVideo = function (video) {

      if (confirm('Are you sure you want to delete the video?')) {
        //Delete from array first, and then from rep?
        video.$delete().then(function (result) {
          var index = $scope.videos.indexOf(video);
          $scope.videos.splice(index, 1);
        });
      }
    };
  });
