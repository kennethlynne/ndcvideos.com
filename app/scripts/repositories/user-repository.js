'use strict';

angular.module('ndc')
  .factory('UserRepository', function ($injector, $http, UserModel) {
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

    return new BaseRepository({name: 'UserRepository', model: UserModel});
  });