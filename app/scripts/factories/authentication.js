'use strict';

angular.module('ndc')
    .factory('authentication', function ($http, BaseUrl, $httpBackend) {

        var _default = {
            token: undefined
        };

        var _model = angular.copy(_default);

        return {
            isLoggedIn: function () {
                return false;
            },
            login: function (grantType, username, password) {

                var cfg = {
                    method: 'POST',
                    url: BaseUrl + 'token',
                    data: 'grant_type=password&username=' + username + '&password=' + password,
                    headers: {'Content-Type':'application/x-www-form-urlencoded'}
                };

                $http(cfg).then(function (response) {
                    if (response && response.data) {
                        var data = response.data;
                        _model.token = data.access_token;
                    }
                });
            },
            getToken: function () {
                return _model.token;
            }
        }
    });
