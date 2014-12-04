angular.module('ndc')
.service('storage', function ($window, $cookies) {

    var storage = {};

    var _set = function (key, data) {

          try{
            var serialized = JSON.stringify(data);
            $window.localStorage.setItem(key, serialized);
          }
          catch(e)
          {
            if(navigator.cookieEnabled)
              $cookies[key] = data;
            else
              storage[key] = data;
          }

        },
        _get = function (key) {

          var data;

          try{
            data = $window.localStorage.getItem(key);
            if(data)
              data = JSON.parse(data);
            else
              data = null;
          }
          catch(e)
          {
            if(navigator.cookieEnabled)
              data = $cookies[key];
            else
              data = storage[key];
          }

          return data;
        };

    return {
      set: _set,
      get: _get
    }

  });
