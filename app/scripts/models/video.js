'use strict';

angular.module('ndc')
    .factory('VideoModel', function ($q, $http, $rootScope, BaseModel, APIBaseUrl, $injector, timeFilter) {

        var collectionUrl = 'videos';

        function VideoModel(data) {
            data = data || {};
            data.url = APIBaseUrl + collectionUrl;

            data.$durationInHHMMSS = timeFilter(data.duration);

            BaseModel.call(this,data);
        }

        VideoModel.$settings = {url: APIBaseUrl + collectionUrl};
        VideoModel.prototype = Object.create(BaseModel.prototype);

        //Decorate save to attach this item to the Repository on successful save
        var _$save = VideoModel.prototype.$save;
        VideoModel.prototype.$save = function () {
            var Video = this;
            return _$save.apply(this, arguments).then(function (response) {
                var Repository = $injector.get('VideoRepository');
                Repository.attach(Video);
                return response;
            });
        };

        return VideoModel;
    });