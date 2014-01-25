'use strict';

angular.module('ndc')
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($q, $injector) {
            return {
                request: function (cfg) {
                    var token = $injector.get('authentication').getToken();
                    if(token) cfg.headers['Authorization'] = token;
                    return cfg || $q.when(cfg);
                }
            };
        });
    })
    .factory('authentication', function ($http, BaseUrl) {

        var _default = {
            token: undefined
        };

        var _model = angular.copy(_default);

        return {
            isLoggedIn: function () {
                return typeof _model.token == 'string';
            },
            login: function (grantType, username, password) {

                var cfg = {
                    method: 'POST',
                    url: BaseUrl + 'token',
                    data: 'grant_type=' + grantType + '&username=' + username + '&password=' + password,
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
