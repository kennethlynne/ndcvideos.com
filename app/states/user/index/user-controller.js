'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('user', stateFactory('User', {
      url: '/user',
      templateUrl: 'states/user/index/main-view.html',
      parent: 'app'
    }));
  })
  .controller('UserCtrl', function ($scope, authentication, $state) {
    $scope.logout = function () {
      authentication.logout();
      $state.go('index');
    };
  });
