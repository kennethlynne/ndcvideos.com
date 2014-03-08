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
            //TODO:
            //VideosRepository.getAllByTags();
            var tags = $stateParams.tags.split(',');
            var tagArray = [];
            for(var i = 0;i < tags.length;i++)
            {
                tagArray[i] = {title:tags[i]};
            }

            VideoRepository.getAll().then(function (videos) {
                console.log(videos);
                $scope.videos = _.where(videos, {tags:tagArray});
            });

        }
        else
        {
            VideoRepository.getAll().then(function (videos) {
                $scope.videos = videos;
            });
        }

    });
