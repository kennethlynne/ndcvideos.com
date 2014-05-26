'use strict';

angular.module('ndc')
  .factory('VideoModel', function ($q, $rootScope, BaseModel, APIBaseUrl, timeFilter) {

    var collectionUrl = 'videos';

    function VideoModel(data) {
      data = data || {};
      data.url = APIBaseUrl + collectionUrl;

      data.$durationInHHMMSS = timeFilter(data.duration);

      data.upload_date = data.upload_date ? new Date(data.upload_date) : new Date();
      data.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
      data.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();

      BaseModel.call(this, data);
    }

    VideoModel.$settings = {url: APIBaseUrl + collectionUrl, tracker: 'VideoModel'};
    VideoModel.prototype = Object.create(BaseModel.prototype);

    return VideoModel;
  });