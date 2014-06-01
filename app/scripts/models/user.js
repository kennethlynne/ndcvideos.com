'use strict';

angular.module('ndc')
  .factory('UserModel', function ($q, $http, $rootScope, BaseModel, APIBaseUrl, $injector) {

    var url = APIBaseUrl + 'users';

    function Model(data) {
      data = data || {};
      data.url = url;
      BaseModel.call(this, data);
    }

    Model.$settings = {url: url};
    Model.prototype = Object.create(BaseModel.prototype);

    Model.prototype.$verify = function (username, verificationToken, newPassword) {
      var model = this;

      model.$isVerifying = true;

      var promise = $http
        .post(model.$settings.urlBase + '/' + model.id + '/verify', {username:username,password: newPassword, verificationToken: verificationToken}, {tracker: model.$settings.tracker + '-' + model.id + '-verify'})
        .then(function (response) {
          return response.data;
        });

      promise.finally(function () {
        model.$isVerifying = false;
      });

      return promise;
    };

    Model.prototype.$resetPassword = function (username) {
      var model = this;

      model.$isResettingPassword = true;

      var promise = $http
        .post(model.$settings.urlBase + '/resetpassword', {username:username}, {tracker: model.$settings.tracker + '-' + model.id + '-resetPassword'})
        .then(function (response) {
          return response.data;
        });

      promise.finally(function () {
        model.$isResettingPassword = false;
      });

      return promise;
    };

    //Decorate save to attach this item to the Repository on successful save
    var _$save = Model.prototype.$save;
    Model.prototype.$save = function () {
      var self = this;
      return _$save.apply(this, arguments).then(function (response) {
        var Repository = $injector.get('UserRepository');
        Repository.attach(self);
        return response;
      });
    };

    return Model;
  });