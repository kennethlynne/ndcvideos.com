'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('videos', stateFactory('Video', {
      url: '/videos?q',
      reloadOnSearch: false,
      templateUrl: 'states/video/index/main-view.html',
      parent: 'app'
    }));
  })
  .controller('VideoCtrl', function ($scope, TagRepository, VideoRepository, $stateParams, $location, _) {

    //Used for search
    var limit = 0;

    $scope.search = function (query) {
      limit = limit + 1;

      queueSearch(limit, query);

      function queueSearch(_limit, query) {
        setTimeout(function () {
          if (_limit === limit) {
            $location.search('q', query ? query : null);

            getVideos(query);
            limit = 0;
          }
        }, 500);
      }

    };




    var getVideos = function (query) {
      $scope.promise = VideoRepository.where(query)
        .then(function (videos) {
          $scope.errormsg = videos.length < 1 ? "Can't find any videos containing these search terms." : null;
          $scope.videos = videos;
        })
        .catch(function (err) {
          //authentication.logout();
          //$state.transitionTo('login');
        });
    };

    $scope.query = $stateParams.q;

    getVideos($stateParams.q);
  });
