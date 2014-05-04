'use strict';

angular.module('ndc')
    .factory('TagRepository', function ($injector, TagModel, $http) {
        var BaseRepository = $injector.get('BaseRepository');

        function TagRepository() {
            BaseRepository.call(this, {name: 'TagRepository', model: TagModel});
        }
        TagRepository.prototype = Object.create(BaseRepository.prototype);

        TagRepository.prototype.search = function (query) {
            var repository = this;
            var Model = repository.$settings.model;

            return $http.get(Model.$settings.url + '?q=' + query, {tracker: repository.$settings.name + '.search'}).then(function (response) {
                if (angular.isArray(response.data)) {
                    return response.data.map(function (item) {
                        var instance = new Model(item);
                        repository.cache[item.id] = instance;
                        return instance;
                    });
                }
                else {
                    throw new Error('Unexpected response from API. Expected Array, got ' + typeof response.data, response.data);
                }
            });
        };

        return new TagRepository();
    });