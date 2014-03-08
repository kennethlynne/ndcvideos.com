'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('index', stateFactory('Index', {
            url:'/?tags'
        }));
    })
    .controller('IndexCtrl', function ($scope, CurrentUser, TagRepository, VideoRepository, $stateParams, _) {

        $scope.tags = []; //This variable holds selected tags

        $scope.User = CurrentUser;

        $scope.select2Options = {
            multiple: true,
            query: function (query) {
                TagRepository.search(query.term).then(function (data) {
                    query.callback({results: data});
                });
            }
        };

        if($stateParams.tags != null)
        {
            VideoRepository.getByTags($stateParams.tags).then(function (videos) {
                $scope.videos = videos;
            });
        }
        else
        {
            VideoRepository.getAll().then(function (videos) {
                $scope.videos = videos;
            });
        }

    });
