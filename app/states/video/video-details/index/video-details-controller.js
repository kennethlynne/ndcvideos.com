'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('videoDetails', stateFactory('Videodetails', {
      url: '/video/{id}',
      templateUrl: 'states/video/video-details/index/main-view.html',
      parent: 'app'
    }));
  })
  .controller('VideodetailsCtrl', function ($scope, $stateParams, $state, VideoRepository, $rootScope) {

   $scope.query = '';

    $scope.search = function (query) {
        $state.go('videos', {q:query});
    };

    VideoRepository.getById($stateParams.id)
      .then(function (video) {
        $scope.video = video;
        $rootScope.pageTitle = video.title;
      })
      .catch(function () {
        $state.go('error', {code: 404});
      });

  });
