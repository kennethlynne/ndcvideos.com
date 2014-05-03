'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('welcome', stateFactory('Welcome', {
      url: '/welcome?verificationToken',
      templateUrl: 'states/welcome/index/main-view.html',
      resolve: {
        userToBeVerified: ['UserRepository', '$stateParams', function (UserRepository, $stateParams) {
          return UserRepository.getByVerificationToken($stateParams.verificationToken);
        }]
      }
    }));
  })
  .controller('WelcomeCtrl', function ($scope, userToBeVerified) {
    $scope.user = userToBeVerified;
  });
