'use strict';

angular.module('ndc')
    .factory('VideoModel', function ($q, $http, $rootScope, ModelFactory, APIBaseUrl, VideoRepository) {

        var collectionUrl = 'video';

        function VideoModel(data) {
            data = data || {};
            data.$urlBase = APIBaseUrl + collectionUrl;
            ModelFactory.call(this,data);
        };

        VideoModel.$urlBase = APIBaseUrl + collectionUrl;
        VideoModel.prototype = Object.create(ModelFactory.prototype);

        //Decorate save to attach this item to the Repository on successful save
        var _$save = VideoModel.prototype.$save;
        VideoModel.prototype.$save = function () {
            var Video = this;
            return _$save.apply(this, arguments).then(function (response) {
                VideoRepository.attach(Video);
                return response;
            });
        };

        return VideoModel;
    });