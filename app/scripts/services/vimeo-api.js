'use strict';

angular.module('ndc')
    .service('vimeoAPI', function vimeoAPI(Config, $http, VideoModel, _) {

        var _apiUrl = Config.vimeoAPIUrl;

        this.getVideos = function () {

            //Should return a list of videos from the Vimeo API
            return $http.get(_apiUrl + "videos.json").then(function (response)
            {
                return _.map(response.data, function (item) {
                    console.log(item);
                    return new VideoModel(item);
                });
            });

        };

    });
