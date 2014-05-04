'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('welcome', stateFactory('Welcome', {
      url: '/welcome?verificationToken',
      templateUrl: 'states/welcome/index/main-view.html',
      resolve: {
        userToBeVerified: ['UserRepository', '$stateParams', '$log', function (UserRepository, $stateParams, $log, $state) {
          return UserRepository.getByVerificationToken($stateParams.verificationToken)
            .catch(function (err) {
              $log.error(err);
              $state.go('error', {code:404});
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
            })
            .catch(function(err){
              //Not able to authenticate the user
              $log.log(err);
              $state.go('error', {code:403});
            });
        })
        .catch(function (err) {
          //Not able to verify the user
          $log.error(err);
          $state.go('error', {code:403});
        });
    };
  });
