'use strict';

angular.module('ndc.components')
  .controller('logoutSidebarItemComponentCtrl', function ($scope, authentication, $state) {
    $scope.logout = function () {
      authentication.logout();
      $state.go('login');
    };
  })
  .component('logoutSidebarItem', function () {
    return {
      controller: 'logoutSidebarItemComponentCtrl'
    };
  });