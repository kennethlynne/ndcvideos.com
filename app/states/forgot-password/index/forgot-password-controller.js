'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('forgot-password', stateFactory('Forgotpassword', {
      url: '/forgot-password?mailSent&token',
      templateUrl: 'states/forgot-password/index/main-view.html'
    }));
  })
  .controller('ForgotpasswordCtrl', function ($scope, UserRepository, $state, $log) {

    $scope.sendMail = function () {
      UserRepository.resetPasswordFor($scope.email)
        .then(function () {
          $state.go('forgot-password');
        })
        .catch(function (err) {
          $log.error(err);
        });
    }

  });
