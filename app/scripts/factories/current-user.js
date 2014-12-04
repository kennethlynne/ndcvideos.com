'use strict';

angular.module('ndc')
  .factory('CurrentUser', function ($log, UserModel, _, $localStorage, profiles) {

    var storage = $localStorage['CurrentUser'] = $localStorage['CurrentUser'] || {};
    var _user = storage.user = storage.user || {};

    var _set = function (user) {
        angular.copy(user, _user);
      },
      _unset = function () {
        angular.copy({}, _user);
      },
      _get = function () {
        return _user;
      },
      _getProfile = function () {
        var profileName = (_user.profile || 'guest'),
          profile = profiles[ profileName ];

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
