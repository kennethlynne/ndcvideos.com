angular.module('ngSymbiosis.model', [])
    .factory('BaseModel', function ($q, $http, $rootScope) {

        function BaseModel(data) {
            var model = this;

            if (!data.url) {
                throw new Error('You must specify an url property');
            }

            this.$settings = {urlBase: data.url};
            delete data.url;

            this.$set(data);

            $rootScope.$watch(function () {
                var copy = angular.copy(model);

                //Remove all properties prefixed with $
                for(var key in copy) if(key.substr(0,1) === '$') delete copy[key];

                return copy;
            }, function (newVal, oldVal) {
                if(newVal !== oldVal) {
                    model.$isDirty = true;
                    model.$_changeSubscribers.forEach(function (cb) {
                        cb();
                    });
                }
            }, true);
        };

        BaseModel.prototype = {
            $set: function (data, resetDirty) {
                var model = this;

                if (resetDirty) {
                    model.$isDirty = false;
                }

                //Remove all properties not prefixed with $
                for(var key in model)
                {
                    //More efficient than indexOf
                    if(key.substr(0,1) !== '$') delete model[key];
                }

                angular.extend(model, data);
            },
            $delete: function () {
                var model = this;
                return $http.delete(model.$settings.urlBase + '/' + model.id, model).then(function (response) {
                    model.$set(response.data, true);
                    return response;
                });
            },
            $save: function () {
                var model = this;

                function handler(response) {
                    model.$set(response.data, true);
                    return response;
                }

                if(model.id)
                {
                    return $http.put(model.$settings.urlBase + '/' + model.id, model).then(handler);
                }
                else
                {
                    return $http.post(model.$settings.urlBase, model).then(handler);
                }
            },
            $_changeSubscribers: [],
            $isDirty: false,
            $onChange: function (cb) {
                var model = this;
                model.$_changeSubscribers.push(cb);
            }
        };

        return BaseModel;
    });