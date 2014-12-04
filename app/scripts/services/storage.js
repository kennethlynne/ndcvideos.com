angular.module('ndc')
  .service('storage', function ($window, $cookies) {

    var storage = {};

    var localStorageSupported = true;
    var cookiesSupported = $window.navigator.cookieEnabled;

    try {
      var data = 123;
      $window.localStorage.setItem('test', data);
      var result = $window.localStorage.getItem('test');
      if (data !== result) {
        throw new Error('No access to localStorage, falling back to cookies');
      }
    }
    catch (e) {
      localStorageSupported = false;
    }

    var _set = function (key, data) {
        if (localStorageSupported) {
          var serialized = JSON.stringify(data);
          $window.localStorage.setItem(key, serialized);
        }
        else if (cookiesSupported) {
          $cookies[key] = data;
        }
        else {
          storage[key] = data;
        }
      },
      _get = function (key) {
        if (localStorageSupported) {
          return JSON.parse(data);
        }
        else if (cookiesSupported) {
          return $cookies[key];
        }
        else {
          return storage[key];
        }
      };

    return {
      set: _set,
      get: _get
    }

  });
