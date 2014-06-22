'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('importVideosOverview', stateFactory('AdminImportVideosOverview', {
      url: '/import-videos?reload',
      templateUrl: 'states/admin/import-videos/index/main-view.html',
      parent: 'admin',
      reloadOnSearch: true
    }));
  })
  .controller('AdminImportVideosOverviewCtrl', function ($scope, vimeoAPI, array) {

    $scope.videos = [];
    $scope.paginatedVideos = [];
    $scope.promise = vimeoAPI.getVideos().then(function (videos) {
      array($scope.videos).set(videos);
    });

  });
