angular.module('ngSymbiosis.model', [])
  .factory('BaseModel', function ($q, $http) {

    function BaseModel(data, cfg) {
      var model = this;

      if (!data.url) {
        throw new Error('You must specify an url');
      }

      this.$settings = {urlBase: data.url};
      delete data.url;

      if (cfg && cfg.tracker) {
        this.$settings.tracker = cfg.tracker;
      }
      else {
        //Rather create some unique id?
        this.$settings.tracker = Math.random().toString(36).substring(2);
      }

      this.$set(data);

    }

    BaseModel.prototype = {
      $set: function (data) {
        var model = this;

        //Remove all properties not prefixed with $
        for (var key in model) {
          //More efficient than indexOf
          if (key.substr(0, 1) !== '$') delete model[key];
        }

        angular.extend(model, data);
      },
      $delete: function () {
        var model = this;
        model.$isDeleting = true;
        return $http
          .delete(model.$settings.urlBase + '/' + model.id, model, {tracker: model.$settings.tracker + '-' + model.id + '-delete'}).then(function (response) {
            model.$set(response.data, true);
            return response;
          })
          .finally(function () {
            model.$isDeleting = false;
          });
      },
      $save: function () {
        var model = this;
        model.$isSaving = true;

        function handler(response) {
          model.$set(response.data, true);
          return response;
        }

        var promise;

        if (model.id) {
          promise = $http.put(model.$settings.urlBase + '/' + model.id, model, {tracker: model.$settings.tracker + '-' + model.id + '-patch'}).then(handler);
        }
        else {
          promise = $http.post(model.$settings.urlBase, model, {tracker: model.$settings.tracker + '-$new$-post'}).then(handler);
        }

        promise.finally(function () {
          model.$isSaving = false;
        });

        return promise;
      },
      $_changeSubscribers: [],
      $onChange: function (cb) {
        var model = this;
        model.$_changeSubscribers.push(cb);
      },
      $isDeleting: false,
      $isSaving: false
    };

    return BaseModel;
  });
