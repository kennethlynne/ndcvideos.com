'use strict';

angular.module('ndc.components')
  .controller('sidebarComponentCtrl', function ($scope, authentication) {
    $scope.isAuthenticated = authentication.isAuthenticated;
  })
  .component('sidebar', function () {
    return {
      controller: 'sidebarComponentCtrl'
    };
  });
