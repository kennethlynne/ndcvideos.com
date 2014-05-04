'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('forgot-password', stateFactory('Forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'states/forgot-password/index/main-view.html'
    }));
  })
  .controller('ForgotpasswordCtrl', function ($scope) {
    $scope.foo = 'bar';
  });
