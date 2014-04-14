'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('login', stateFactory('Login', {
      url: '/login',
      templateUrl: 'states/login/index/main-view.html'
    }));
  })
  .controller('LoginCtrl', function ($scope, authentication, $state) {

    if (authentication.isAuthenticated()) {
      //Wait until event finishes to avoid race condition bug
      // where login screen gets rendered thousands of times (bug in ui router)
      $scope.$on('$stateChangeSuccess', function () {
        $state.go('videos');
      });
    }

    $scope.login = function (username, password) {
      $scope.working = true;

      authentication.login('password', username, password)
        .then(function (isLoggedIn) {
          if (isLoggedIn) $state.go('videos');
        })
        .catch(function (reason) {
          alert(reason);
        })
        .finally(function () {
          $scope.working = false;
        })
    }
  });
