'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('user', stateFactory('User', {
      url: '/user',
      templateUrl: 'states/user/index/main-view.html',
      parent: 'app'
    }));
  })
  .controller('UserCtrl', function ($scope) {
    $scope.foo = 'bar';
  });
