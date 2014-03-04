'use strict';

angular.module('ndc')
    .factory('CurrentUser', function ($log, UserModel, _) {

        var _user = {};
        var _permissions = [];

        var _set = function (user) {
                if(!user) $log.error("No data defined when initializing CurrentUser");
                if(!(user instanceof UserModel)) $log.error("Expected UserModel when initializing CurrentUser");
                angular.copy(user, _user);
            },
            _get = function ()
            {
                return _user;
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
            get:_get,
            can: _can,
            setPermissions: _setPermissions,
            getPermissions: _getPermissions
        }
    });
