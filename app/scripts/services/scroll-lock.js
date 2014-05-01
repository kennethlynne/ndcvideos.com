'use strict';

angular.module('ndc')
  .service('scrollLock', function ($rootScope) {
    this.enable = function () {
      $rootScope.$$scrollLockEnabled = true;
    };
    this.disable = function () {
      $rootScope.$$scrollLockEnabled = false;
    };
  });