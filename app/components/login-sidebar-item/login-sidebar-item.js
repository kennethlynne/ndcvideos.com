'use strict';

angular.module('ndc.components')
  .controller('loginSidebarItemComponentCtrl', function ($scope, $state) {
    $scope.login = function () {
      $state.go('login');
    }
  })
  .component('loginSidebarItem', function () {
    return {
      controller: 'loginSidebarItemComponentCtrl'
    };
  });