'use strict';

angular.module('ndc')
  .service('vimeoAPI', function vimeoAPI(Config, $http, VideoModel, _, APIBaseUrl) {

    this.getVideos = function () {

      //Should return a list of videos from the Vimeo API
      return $http
        .get(APIBaseUrl + 'imports?provider=vimeo', {tracker: 'vimeoAPI.getVideos'})
        .then(function (response) {
          return _.map(response.data, function (item) {
            return new VideoModel(item);
          });
        });

    };

    this.getVideoById = function (id) {

      //Should return a video from the Vimeo API
      return $http
        .get(APIBaseUrl + 'imports/' + id + '?provider=vimeo', {tracker: 'vimeoAPI.getVideoById'})
        .then(function (response) {
          delete response.data.id;
          return new VideoModel(response.data);
        });
    }

  });
