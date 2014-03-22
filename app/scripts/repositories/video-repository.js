'use strict';

angular.module('ndc')
        .factory('VideoRepository', function ($injector, VideoModel, $http) {
            var BaseRepository = $injector.get('BaseRepository');

            function VideoRepository() {
                BaseRepository.call(this, {name: 'VideoRepository', model: VideoModel});
            }
            VideoRepository.prototype = Object.create(BaseRepository.prototype);

            VideoRepository.prototype.getByTags = function (tags) {
                var repository = this;
                var Model = repository.$settings.model;

                return $http.get(Model.$settings.url + '/search?tags=' + tags, {tracker: repository.$settings.name + '.tags'}).then(function (response) {
                    if (angular.isArray(response.data)) {
                        return response.data.map(function (item) {
                            var instance = new VideoModel(item);
                            repository.cache[item.id] = instance;
                            return instance;
                        });
                    }
                    else {
                        throw new Error('Unexpected response from API. Expected Array, got ' + typeof response.data, response.data);
                    }
                });
            };

            return new VideoRepository();
        });