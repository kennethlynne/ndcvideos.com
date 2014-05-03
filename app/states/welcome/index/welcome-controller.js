'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('welcome', stateFactory('Welcome', {
      url: '/welcome?verificationToken',
      templateUrl: 'states/welcome/index/main-view.html',
      resolve: {
        userToBeVerified: ['UserRepository', '$stateParams', '$log', function (UserRepository, $stateParams, $log) {
          return UserRepository.getByVerificationToken($stateParams.verificationToken)
            .catch(function (err) {
              $log.error(err);
            });
        }]
      }
    }));
  })
  .controller('WelcomeCtrl', function ($scope, userToBeVerified, $state, $stateParams, authentication, $log) {
    $scope.user = userToBeVerified;

    $scope.verify = function () {
      $scope.user.$verify($stateParams.verificationToken, $scope.password)
        .then(function () {
          return authentication.login($scope.user.username, $scope.password)
            .then(function (response) {
              $state.go('videos');
              return response;
            });
        })
        .catch(function (err) {
          $log.error(err);
        });
    };
  });
