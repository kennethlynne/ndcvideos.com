'use strict';

angular.module('ndc')
  .factory('VideoModel', function ($q, $http, $rootScope, BaseModel, APIBaseUrl, $injector, timeFilter) {

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

    //Decorate save to attach this item to the Repository on successful save
    var _$save = VideoModel.prototype.$save;
    VideoModel.prototype.$save = function () {
      var Video = angular.copy(this);
      delete Video.upload_date;
      delete Video.createdAt;
      delete Video.updatedAt;

      return _$save.apply(Video, arguments).then(function (response) {
        var Repository = $injector.get('VideoRepository');
        Repository.attach(Video);
        return response;
      });
    };

    return VideoModel;
  });