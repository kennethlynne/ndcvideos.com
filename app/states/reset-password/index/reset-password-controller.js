'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('reset-password', stateFactory('Resetpassword', {
      url: '/reset-password?token',
      templateUrl: 'states/reset-password/index/main-view.html'
    }));
  })
  .controller('ResetpasswordCtrl', function ($scope, UserRepository, $state, $log, $stateParams) {

    $scope.token = $stateParams.token;

    $scope.setPassword = function () {
        UserRepository.setPassword($scope.newPassword, $scope.token)
          .then(function () {
              alert('Password changed!');
          })
          .catch(function () {
              alert('Drama happened when trying to change password');
          });
    }

  });
