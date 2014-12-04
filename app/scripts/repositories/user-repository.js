'use strict';

angular.module('ndc')
  .factory('UserRepository', function ($injector, $http, UserModel, $log) {
    var BaseRepository = $injector.get('BaseRepository');

    BaseRepository.prototype.getByToken = function (token) {
      var repository = this;
      var Model = repository.$settings.model;

      return $http
        .get(Model.$settings.url + '?token=' + encodeURIComponent(token), {tracker: repository.$settings.name + '.getByToken'})
        .then(function (response) {
          return new Model(response.data);
        });
    };

    BaseRepository.prototype.getByVerificationToken = function (verificationToken) {
      var repository = this;
      var Model = repository.$settings.model;

      return $http
        .get(Model.$settings.url + '?verificationToken=' + encodeURIComponent(verificationToken), {tracker: repository.$settings.name + '.getByVerificationToken'})
        .then(function (response) {
          return new Model(response.data);
        });
    };

    BaseRepository.prototype.resetPasswordFor = function (email) {
      var repository = this;
      var Model = repository.$settings.model;

      return $http
        .post(Model.$settings.url + '/resetPassword', {username: email}, {tracker: repository.$settings.name + '.resetPasswordFor'})
        .then(function (response) {
          return response.data;
        });
    };

    BaseRepository.prototype.setPassword = function (token, password) {
      var repository = this;
      var Model = repository.$settings.model;

      return $http
        .put(Model.$settings.url + '/setPassword', {
          token: token,
          password: password
        }, {tracker: repository.$settings.name + '.setPassword'})
        .then(function (response) {
          return response.data;
        });
    };

    return new BaseRepository({name: 'UserRepository', model: UserModel});
  });
