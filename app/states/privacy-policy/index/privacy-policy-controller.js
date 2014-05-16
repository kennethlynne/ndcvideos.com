'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('privacy-policy', stateFactory('Privacypolicy', {
      url: '/privacy-policy',
      templateUrl: 'states/privacy-policy/index/main-view.html'
    }));
  })
  .controller('PrivacypolicyCtrl', function ($scope) {
    $scope.foo = 'bar';
  });
