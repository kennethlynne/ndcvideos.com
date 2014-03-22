angular.module('ngSymbiosis.accessControl', ['ngStorage'])
    .factory('accessControl', function ($localStorage) {

        var storage = $localStorage['ngSymbiosis.accessControl'] = $localStorage['ngSymbiosis.accessControl'] || {};

        var _permissions = storage.permissions = storage.permissions || [];
        var _roles = storage.roles = storage.roles || [];

        var _set = function (user) {
                _setRoles(user.roles);
                _setPermissions(user.permissions);

                angular.copy(user, _user);
            },
            _unset = function () {
                _setRoles([]);
                _setPermissions([]);
            },
            _is = function (role) {
                return _roles.indexOf(role) >= 0;
            },
            _setRoles = function (roles) {
                angular.copy(roles, _roles);
            },
            _getRoles = function () {
                return angular.copy(_roles);
            },
            _setPermissions = function (permissions) {
                angular.copy(permissions, _permissions);
            },
            _getPermissions = function () {
                return angular.copy(_permissions);
            },
            _can = function (thing) {
                return _permissions.indexOf(thing) >= 0;
            };

        return {
            set: _set,
            unset: _unset,
            can: _can,
            is: _is,
            setRoles: _setRoles,
            getRoles: _getRoles,
            setPermissions: _setPermissions,
            getPermissions: _getPermissions
        }
    });
