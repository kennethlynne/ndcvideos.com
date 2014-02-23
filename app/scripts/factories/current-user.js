'use strict';

angular.module('ndc')
    .factory('CurrentUser', function ($log) {

        var _user = {};

        var _set = function (data) {
                if(!data) $log.error("No data defined when initializing CurrentUser");
                _user = data;
            },
            _get = function ()
            {
                return _user;
            };

        return {
            set: _set,
            get:_get
        }
    });
