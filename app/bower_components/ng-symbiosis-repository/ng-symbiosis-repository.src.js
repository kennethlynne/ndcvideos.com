angular.module('ngSymbiosis.repository', [])
    .factory('BaseRepository', function ($q, $http) {

        function BaseRepository(data) {
            if (!data.name) {
                throw new Error('You must specify a name');
            }

            this.$settings = {
                name: data.name,
                model: data.model
            };

            this.cache = [];
        }

        BaseRepository.prototype.getById = function (id) {
            var repository = this;
            var Model = repository.$settings.model;

            var deferred = $q.defer();
            var instance = repository.cache[id];
            if (instance) {
                deferred.resolve(instance);
                return deferred.promise;
            }
            else {
                return $http.get(Model.$settings.url + '/' + id, {tracker: repository.$settings.name + '.getById'}).then(function (response) {
                    var instance = new Model(response.data);
                    repository.cache[id] = instance;
                    return instance;
                });
            }
        };

        BaseRepository.prototype.getAll = function () {
            var repository = this;
            var Model = repository.$settings.model;

            //TODO: Max length of pool, to not manage to many instances in memory?
            return $http.get(Model.$settings.url, {tracker: repository.$settings.name + '.getAll'}).then(function (response) {
                if (angular.isArray(response.data)) {
                    repository.cache.length = 0; //empty pool
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

        //This is to attach new models to the Repository
        BaseRepository.prototype.attach = function (item) {
            var repository = this;
            var Model = repository.$settings.model;

            if (!(item instanceof Model)) throw new Error('You must provide a valid ' + repository.$settings.name + 'Model');
            repository.cache[item.id] = item;
        };

        BaseRepository.prototype.create = function (data) {
            var repository = this;
            var Model = repository.$settings.model;

            return new Model(data);
        };

        return BaseRepository;
    });