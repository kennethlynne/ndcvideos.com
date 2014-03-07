'use strict';

angular.module('ndc')
    .factory('CurrentUser', function ($log, UserModel, _, $localStorage, UserRepository) {

        var storage = $localStorage['CurrentUser'] = $localStorage['CurrentUser'] || {};

        var _user = storage.user = storage.user || {};
        var _permissions = storage.permissions = storage.permissions || [];
        var _roles = storage.roles = storage.roles || [];

        if(_user.id)
        {
            //Update user on initialization
            UserRepository.getById(_user.id).then(_set);
        }

        var _set = function (user) {
                if(!(user instanceof UserModel)) $log.error("Expected UserModel when initializing CurrentUser");

                _setRoles(user.roles);
                _setPermissions(user.permissions);

                angular.copy(user, _user);
            },
            _unset = function () {
                _setRoles([]);
                _setPermissions([]);
                angular.copy({}, _user);
            },
            _get = function ()
            {
                return _user;
            },
            _is = function (role) {
                return _.indexOf(_roles, role) >= 0;
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
                return _.indexOf(_permissions, thing) >= 0;
            };

        return {
            set: _set,
            unset: _unset,
            get:_get,
            can: _can,
            is: _is,
            setRoles: _setRoles,
            getRoles: _getRoles,
            setPermissions: _setPermissions,
            getPermissions: _getPermissions
        }
    });
