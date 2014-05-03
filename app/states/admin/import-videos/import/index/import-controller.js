'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('administrateVideosImportModal', stateFactory('ImportVideoModal', {
      url: '/import/{id}',
      resolve: {
        scrollLock: ['scrollLock', function (sl) {
          return sl;
        }]
      },
      views: {
        'modal@app': {
          templateUrl: 'states/admin/administrate-videos/import/index/modal.html',
          controller: 'ImportVideoModalCtrl'
        }
      },
      parent: 'importVideos',
      onEnter: ['scrollLock', function (sl) {
        sl.enable();
      }],
      onExit: ['scrollLock', function (sl) {
        sl.disable();
      }]
    }));
  })
  .controller('ImportVideoModalCtrl', function ($scope, TagRepository, $state) {

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
      alert('Publish');
    };
  });
