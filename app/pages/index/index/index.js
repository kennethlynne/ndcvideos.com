'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('index', stateFactory('Index', {
            url: '/?q',
            reloadOnSearch: false
        }));
    })
    .controller('IndexCtrl', function ($scope, CurrentUser, TagRepository, VideoRepository, $stateParams, $location, _, TagModel) {


        $scope.User = CurrentUser;

        $scope.search = _.throttle(function (query) {

            //update query parameters and set videos by query
            $location.search('q', query ? query : null);

            getVideos(query);

        }, 500, {'leading': false, 'trailing': true});

        var getVideos = function (query) {
            VideoRepository.where(query).then(function (videos) {
                $scope.errormsg = videos.length<1?'No videos :/':null;

                $scope.videos = videos;
            });
        };

        $scope.query = $stateParams.q;

        getVideos($stateParams.q);

    });
