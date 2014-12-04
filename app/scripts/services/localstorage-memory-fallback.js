'use strict';

angular.module('ndc')
  .config(function ($provide) {
    $provide.decorator('$localStorage', ['$delegate', '$window', function ($delegate, $window) {

      try {
        $window.localStorage.setItem('test', '123');
        $window.localStorage.getItem('item');
      }
      catch (e) {
        return {};
      }

      return $delegate;
    }]);
  });
