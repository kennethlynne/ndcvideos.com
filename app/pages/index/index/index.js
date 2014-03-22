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


//        $scope.select2Options = {
//            multiple: true,
//            query: function (query) {
//                TagRepository.search(query.term).then(function (data) {
//                    query.callback({results: data});
//                });
//            }
//        };
//
//        if($stateParams.q != null)
//        {
//            setVideosByTags($stateParams.tags);
//            $scope.tags = _.map($stateParams.tags.split(','),function (item)
//            {
//                return new TagModel({text:item});
//            });
//        }
//        else
//        {
//            setAllVideos();
//        }
//
//        $scope.filter = function ()
//        {
//           if($scope.tags.length > 0)
//           {
//               var tags = _.map($scope.tags, function (item)
//               {
//                   return item.text;
//               }).join(',');
//
//               $location.search('tags', tags);
//               setVideosByTags(tags);
//           }
//            else
//           {
//               //To reset the URL params
//               delete $location.$$search.tags;
//               $location.$$compose();
//               setAllVideos();
//           }
//        }
//
//        function setAllVideos(){
//            VideoRepository.getAll().then(function (videos) {
//                $scope.videos = videos;
//            });
//        };
//
//
//        function setVideosByTags(tags)
//        {
//            VideoRepository.getByTags(tags).then(function (videos) {
//                $scope.videos = videos;
//            });
//        };
    });
