'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('importVideosOverview', stateFactory('AdminImportVideosOverview', {
      url: '/import-videos',
      templateUrl: 'states/admin/import-videos/index/main-view.html',
      parent: 'admin'
    }));
  })
  .controller('AdminImportVideosOverviewCtrl', function ($scope, vimeoAPI, Paginator) {

    $scope.paginatedVideos = new Paginator({pageSize: 10});

    vimeoAPI.getVideos().then(function (videos) {
      $scope.paginatedVideos.setData(videos);
    });

  });
