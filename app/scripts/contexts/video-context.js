'use strict';

angular.module('ndc')
    .factory('VideoContext', function ($q, $http, $injector) {
        var _pool = {};

        var _getById = function (id) {
            var VideoModel = $injector.get('VideoModel');
            var deferred = $q.defer();
            var instance = _pool[id];
            if(instance)
            {
                deferred.resolve(instance);
                return deferred.promise;
            }
            else
            {
                return $http.get(VideoModel.$urlBase + '/' + id).then(function (response) {
                    var Video = new VideoModel(response.data);
                    _pool[id] = Video;
                    return Video;
                });
            }

        };

        var _getAll = function () {
            var VideoModel = $injector.get('VideoModel');
            //TODO: Max length of pool, to not manage to many instances in memory?
            return $http.get(VideoModel.$urlBase).then(function (response) {
                if(Array.isArray(response.data))
                {
                    return response.data.map(function (item) {
                        var Video = new VideoModel(item);
                        _pool[item.id] = Video;
                        return Video;
                    });
                }
                else {
                    throw new Error('Unexpected response from API. Expected Array, got ' + typeof response.data, response.data);
                }
            });
        };

        //This is to attach new models to the context
        var _attach = function (item) {
            var VideoModel = $injector.get('VideoModel');

            if(!(item instanceof VideoModel)) throw new Error('You must provide a valid VideoModel');
            _pool[item.id] = item;
        };

        var _create = function (data) {
            var VideoModel = $injector.get('VideoModel');
            return new VideoModel(data);
        };

        return {
            getById: _getById,
            getAll: _getAll,
            attach: _attach,
            create: _create,
            _pool: _pool
        }
    });