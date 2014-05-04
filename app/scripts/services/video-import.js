'use strict';

angular.module('ndc')
  .service('videoImport', function videoImport(Config, $http, VideoModel, _, APIBaseUrl) {
    this.provider = function (provider) {
      return {
        getVideos: function () {
          return $http
            .get(APIBaseUrl + 'imports?provider=' + provider, {tracker: 'videoImport.getVideos'})
            .then(function (response) {
              return _.map(response.data, function (item) {
                return new VideoModel(item);
              });
            });
        },

        getVideoById: function (id) {
          return $http
            .get(APIBaseUrl + 'imports/' + id + '?provider=' + provider, {tracker: 'videoImport.getVideoById'})
            .then(function (response) {
              //Remove id to force model to do a POST on $save
              delete response.data.id;
              return new VideoModel(response.data);
            });
        }
      };
    };
  });
