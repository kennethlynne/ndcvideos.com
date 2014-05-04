'use strict';

angular.module('ndc')
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push(['$q', '$injector', 'BaseUrl', function ($q, $injector, BaseUrl) {
      return {
        request: function (cfg) {
          var token = $injector.get('authentication').getToken();
          var matchesAPIUrl = cfg.url.substr(0, BaseUrl.length) === BaseUrl;

          if (token && matchesAPIUrl) {
            cfg.headers['Authorization'] = 'Bearer ' + token;
          }
          return cfg || $q.when(cfg);
        }
      };
    }]);
  })
  .run(function ($rootScope, $urlRouter, authentication, $state, $location, CurrentUser, $log, _) {
    $rootScope.$on('$locationChangeSuccess', function (e) {
      e.preventDefault();

      var path = $location.path().substr(1);

      //List of pages you can visit without being authorized
      var allowAnonymous = [
        'login',
        'error',
        'welcome'
      ];

      var requireRole = {
        //page: [required roles...]
        'admin': ['administrator']
      };

      if (allowAnonymous.indexOf(path) >= 0 || authentication.isAuthenticated()) {

        var index = _.chain(requireRole).keys().indexOf(path).value();
        var userHasAllRequiredRoles = function () {
          return _.every(requireRole[index], function (role) {
            if (!CurrentUser.is(role)) {
              $log.error('User does not have required role ' + role);
              return false;
            }
            return true;
          });
        };

        if (index == -1 || userHasAllRequiredRoles()) {
          $urlRouter.sync();
        }
        else {
          $log.error('User is not authorized to access ' + path);
          $state.go('login');
        }
      }
    });
  })
  .factory('authentication', function ($http, BaseUrl, $localStorage, $log, $q, UserRepository, CurrentUser) {

    var _logout = function () {
        CurrentUser.unset();
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

            return UserRepository.getByToken(data.access_token)
              .then(CurrentUser.set)
              .then(function () {
                deferred.resolve(true);
              });
          }
          else {
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
    };
  });