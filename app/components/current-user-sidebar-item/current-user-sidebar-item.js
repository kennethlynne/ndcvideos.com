'use strict';

angular.module('ndc.components')
  .controller('currentUserSidebarItemComponentCtrl', function ($scope, CurrentUser) {
    $scope.user = CurrentUser.get();
  })
  .component('currentUserSidebarItem', function () {
    return {
      controller: 'currentUserSidebarItemComponentCtrl'
    };
  });