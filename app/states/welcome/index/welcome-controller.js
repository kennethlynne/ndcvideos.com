'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('welcome', stateFactory('Welcome', {
      url: '/welcome',
      templateUrl: 'states/welcome/index/main-view.html'
    }));
  })
  .controller('WelcomeCtrl', function ($scope) {

    $scope.username = 'arne@arne.com';

  });
