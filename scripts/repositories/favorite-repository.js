'use strict';

angular.module('ndc')
    .factory('FavoriteRepository', function ($injector, FavoriteModel, $http, $q, _) {
        var BaseRepository = $injector.get('BaseRepository');

        function FavoriteRepository() {
            BaseRepository.call(this, {name: 'FavoriteRepository', model: FavoriteModel})
        }
        FavoriteRepository.prototype = Object.create(BaseRepository.prototype);

        //Remove unused methods
        FavoriteRepository.prototype.getAll = undefined;
        FavoriteRepository.prototype.getById = undefined;

        FavoriteRepository.prototype.getAllByUserId = function (userId) {
            var repository = this;
            var Model = repository.$settings.model;

            var deferred = $q.defer();
            var cache = repository.cache[userId];
            if (cache) {

                deferred.resolve(_.map(cache, function (item) {
                    return new Model(item);
                }));

                return deferred.promise;
            }
            else {
                return $http.get(Model.$settings.url + '/' + userId, {tracker: repository.$settings.name + '.getAllByUserId'}).then(function (response) {
                    repository.cache[userId] = {};

                    return _.map(response.data, function (item) {
                        repository.cache[userId][item.id] = item;
                        return new Model(item);
                    });
                });
            }
        };

        BaseRepository.prototype.attach = function (userFavorites) {
            var repository = this;
            var Model = repository.$settings.model;

            function invalid() {
                throw new Error('You must provide a valid ' + repository.$settings.name + 'Model');
            }

            if (!userFavorites.id) {
                invalid();
            }
            _.each(userFavorites.favourites, function (favourite) {
                if (!(favourite instanceof Model)) invalid();
            });

            _.each(userFavorites.favourites, function (favourite) {
                var userId = userFavorites.id;
                repository.cache[userId] = repository.cache[userFavorites.id] || {};
                repository.cache[userId][favourite.id] = favourite;
            });
        };

        return new FavoriteRepository();
    });