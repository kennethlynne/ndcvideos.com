'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('administrateVideos', stateFactory('Administratevideos', {
      url: '/videos',
      templateUrl: 'states/admin/administrate-videos/index/main-view.html',
      parent: 'admin'
    }));
  })
  .controller('AdministratevideosCtrl', function ($scope, VideoRepository, Paginator) {

    $scope.paginatedVideos = new Paginator({pageSize: 10});

    VideoRepository.getAll().then(function (videos) {
      $scope.paginatedVideos.setData(videos);
    });

    $scope.deleteVideo = function (video) {

      if (confirm('Are you sure you want to delete the video?')) {
        //Delete from array first, and then from rep?
        video.$delete().then(function (result) {
          var index = $scope.paginatedVideos.data.indexOf(video);
          $scope.paginatedVideos.data.splice(index, 1);
        });
      }
    };
  });
