'use strict';

angular.module('ndc')
  .factory('CurrentUser', function ($log, UserModel, _, storage, profiles) {

    var userStorage = storage.get['CurrentUser'] || {};
    storage.set('CurrentUser', userStorage);

    var _set = function (user) {
        angular.copy(user, userStorage);
        storage.set('CurrentUser', userStorage);
      },
      _unset = function () {
        angular.copy({}, userStorage);
        storage.set('CurrentUser', {});
      },
      _get = function () {
        return userStorage;
      },
      _getProfile = function () {
        var profileName = (userStorage.profile || 'guest'),
          profile = profiles[profileName];

        if (!profile) {
          profile = profiles['guest'];
          $log.error('Profile ' + profileName + ' not found.');
        }

        return profile;
      },
      _hasRoles = function (roles) {
        var profile = _getProfile();

        if (!roles) {
          return true;
        }

        if (angular.isArray(roles)) {
          return _.every(roles, function (role) {
            return profile.hasRoles(role);
          });
        }
        else {
          return profile.hasRoles(roles);
        }

      };

    return {
      set: _set,
      unset: _unset,
      get: _get,
      getProfile: _getProfile,
      hasRoles: _hasRoles
    }
  });
