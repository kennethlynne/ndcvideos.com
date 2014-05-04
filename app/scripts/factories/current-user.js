'use strict';

angular.module('ndc')
  .factory('CurrentUser', function ($log, UserModel, _, $localStorage, accessControl) {

    var storage = $localStorage['CurrentUser'] = $localStorage['CurrentUser'] || {};
    var _user = storage.user = storage.user || {};

    var _set = function (user) {
        if (!(user instanceof UserModel)) $log.error("Expected UserModel when initializing CurrentUser");

        _setRoles(user.roles);
        _setPermissions(user.permissions);

        angular.copy(user, _user);
      },
      _unset = function () {
        accessControl.unset();
        angular.copy({}, _user);
      },
      _get = function () {
        return _user;
      },
      _is = function (role) {
        return accessControl.is(role);
      },
      _setRoles = function (roles) {
        accessControl.setRoles(roles);
      },
      _getRoles = function () {
        return accessControl.getRoles();
      },
      _setPermissions = function (permissions) {
        accessControl.setPermissions(permissions);
      },
      _getPermissions = function () {
        return accessControl.getPermissions();
      },
      _can = function (thing) {
        return accessControl.can(thing);
      };

    return {
      set: _set,
      unset: _unset,
      get: _get,
      can: _can,
      is: _is,
      setRoles: _setRoles,
      getRoles: _getRoles,
      setPermissions: _setPermissions,
      getPermissions: _getPermissions
    }
  });
