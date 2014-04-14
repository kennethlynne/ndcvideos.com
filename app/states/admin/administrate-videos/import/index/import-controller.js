'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('administrateVideosImport', stateFactory('Import', {
      url: '/videos/import/{id}',
      templateUrl: 'states/admin/administrate-videos/import/index/main-view.html',
      parent: 'admin'
    }));
  })
  .controller('ImportCtrl', function ($scope, TagRepository, $state) {

    $scope.tags = []; //This variable holds selected tags

    $scope.select2Options = {
      multiple: true,
      query: function (query) {
        TagRepository.search(query.term).then(function (data) {
          query.callback({results: data});
        });
      }
    };

    $scope.cancel = function () {
      if (!!confirm('Er du sikker på at du vil forkaste alle data?')) {
        $state.go('administrateVideos');
      }
    };

    $scope.publish = function () {

    }
  });
