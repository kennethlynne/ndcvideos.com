'use strict';

angular.module('ndc')
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($q, $injector, BaseUrl) {
            return {
                request: function (cfg) {
                    var token = $injector.get('authentication').getToken();
                    var matchesAPIUrl = cfg.url.substr(0, BaseUrl.length) === BaseUrl;

                    if (token && matchesAPIUrl) {
                        cfg.headers['Authorization'] = token;
                    }
                    return cfg || $q.when(cfg);
                }
            };
        });
    })
    .factory('authentication', function ($http, BaseUrl, $localStorage, $log, $q) {

        var _logout = function () {
                delete $localStorage.token;
            },
            _getToken = function () {
                return $localStorage.token;
            },
            _login = function (grantType, username, password) {

                var deferred = $q.defer();

                var cfg = {
                    method: 'POST',
                    url: BaseUrl + 'token',
                    data: 'grant_type=' + grantType + '&username=' + username + '&password=' + password,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                };

                $http(cfg).then(function (response) {
                    if (response && response.data) {
                        var data = response.data;
                        $localStorage.token = data.access_token;
                        deferred.resolve(true);
                    }
                    else
                    {
                        deferred.reject('No data received');
                    }
                })
                .catch(function (response) {
                    var message = (response && response.data && response.data.message) ? response.data.message : '';
                    deferred.reject('Could not log you in. ' + message);
                })
                .finally(function () {
                    $log.log('Log in request finished.');
                });

                return deferred.promise;

            },
            _isAuthenticated = function () {
                return typeof $localStorage.token == 'string';
            };

        return {
            isAuthenticated: _isAuthenticated,
            login: _login,
            getToken: _getToken,
            logout: _logout
        }
    })
    .run(function (authentication, $state) {
        authentication.isAuthenticated() || $state.go('login')
    });
