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
          $state.go('reset-password');
        })
        .catch(function (err) {
          alert('For security reasons, you can\'t reset your password more then one at a time. Please check your mail');
          $log.error(err);
        });
    }

  });
