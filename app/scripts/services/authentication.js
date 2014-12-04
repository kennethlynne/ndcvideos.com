'use strict';

angular.module('ndc')
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push(['$q', '$injector', 'APIBaseUrl', function ($q, $injector, APIBaseUrl) {
      return {
        request: function (cfg) {
          var token = $injector.get('authentication').getToken();
          var matchesAPIUrl = cfg.url.substr(0, APIBaseUrl.length) === APIBaseUrl;

          if (token && matchesAPIUrl) {
            cfg.headers['x-access-token'] = token;
          }

          return $q.when(cfg);
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
        'welcome',
        'videos'
      ];

      var requireRole = {
        //page: [required roles...]
        'admin': ['ndcVideos.create', 'ndcVideos.remove', 'ndcVideos.view', 'ndcVideos.list', 'ndcUsers.create', 'ndcUsers.remove', 'ndcUsers.view', 'ndcUsers.list']
      };

      if (allowAnonymous.indexOf(path) >= 0 || authentication.isAuthenticated()) {

        var index = _.chain(requireRole).keys().indexOf(path).value();

        if (index == -1 || CurrentUser.hasRoles(requireRole[index])) {
          $urlRouter.sync();
        }
        else {
          $log.error('User is not authorized to access ' + path);
          $state.go('login');
        }
      }
    });
  })
  .factory('authentication', function ($http, APIBaseUrl, storage, $log, $q, UserRepository, CurrentUser) {

    var _logout = function () {
        CurrentUser.unset();
        delete storage.set('token', void 0);
      },
      _getToken = function () {
        return storage.get('token') || undefined;
      },
      _login = function (grantType, username, password) {
        //TODO: Remove grantType. It is pure lol
        var deferred = $q.defer();

        var cfg = {
          method: 'POST',
          url: APIBaseUrl + 'authentication/login',
          data: {
            username: username,
            password: password
          }
        };

        $http(cfg).then(function (response) {
          if (response && response.data) {
            var data = response.data;

            storage.set('token', data.access_token);

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
        return typeof storage.get('token') == 'string';
      };

    return {
      isAuthenticated: _isAuthenticated,
      login: _login,
      getToken: _getToken,
      logout: _logout
    };
  });
