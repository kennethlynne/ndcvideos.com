'use strict';

angular.module('ndc')
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($q, $injector, BaseUrl) {
            return {
                request: function (cfg) {
                    var token = $injector.get('authentication').getToken();
                    var matchesAPIUrl = cfg.url.substr(0, BaseUrl.length) === BaseUrl;

                    if(token && matchesAPIUrl) {
                        cfg.headers['Authorization'] = token;
                    }
                    return cfg || $q.when(cfg);
                }
            };
        });
    })
    .factory('authentication', function ($http, BaseUrl, $localStorage) {

        return {
            isLoggedIn: function () {
                return typeof $localStorage.token == 'string';
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
                        $localStorage.token = data.access_token;
                    }
                });
            },
            getToken: function () {
                return $localStorage.token;
            },
            logout: function () {
                delete $localStorage.token;
            }
        }
    })
    .run(function (authentication, $state) {
        //$state.go('^.login');
    });
