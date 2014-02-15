'use strict';

angular.module('ndc')
    .factory('UserRepository', function ($q, $http, $injector) {
        var _pool = {};

        var _getById = function (id) {
            var UserModel = $injector.get('UserModel');
            var deferred = $q.defer();
            var instance = _pool[id];
            if(instance)
            {
                deferred.resolve(instance);
                return deferred.promise;
            }
            else
            {
                return $http.get(UserModel.$urlBase + '/' + id).then(function (response) {
                    var User = new UserModel(response.data);
                    _pool[id] = User;
                    return User;
                });
            }

        };

        var _getAll = function () {
            var UserModel = $injector.get('UserModel');
            //TODO: Max length of pool, to not manage to many instances in memory?
            return $http.get(UserModel.$urlBase).then(function (response) {
                if(Array.isArray(response.data))
                {
                    return response.data.map(function (item) {
                        var User = new UserModel(item);
                        _pool[item.id] = User;
                        return User;
                    });
                }
                else {
                    throw new Error('Unexpected response from API. Expected Array, got ' + typeof response.data, response.data);
                }
            });
        };

        //This is to attach new models to the Repository
        var _attach = function (item) {
            var UserModel = $injector.get('UserModel');

            if(!(item instanceof UserModel)) throw new Error('You must provide a valid UserModel');
            _pool[item.id] = item;
        };

        var _create = function (data) {
            var UserModel = $injector.get('UserModel');
            return new UserModel(data);
        };

        return {
            getById: _getById,
            getAll: _getAll,
            attach: _attach,
            create: _create,
            _pool: _pool
        }
    });