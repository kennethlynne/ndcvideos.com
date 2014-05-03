'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('importVideosOverview', stateFactory('AdminImportVideosOverview', {
      url: '/import-videos',
      templateUrl: 'states/admin/import-videos/index/main-view.html',
      parent: 'admin'
    }));
  })
  .controller('AdminImportVideosOverviewCtrl', function ($scope, vimeoAPI) {

    $scope.vimeoVideos = [];
    vimeoAPI.getVideos().then(function (videos) {
      $scope.vimeoVideos = videos;
    });

  });
