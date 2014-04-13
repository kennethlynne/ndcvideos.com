'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory, $urlRouterProvider) {

    $urlRouterProvider.when('/app', '/app/videos');
    $urlRouterProvider.when('/app/', '/app/videos');

    $stateProvider.state('app', stateFactory('App', {
      url: '/app',
      abstract: true,
      templateUrl: 'states/app-layout.html'
    }));
  })
  .controller('AppCtrl', function ($scope, authentication, UserRepository, CurrentUser, $state) {

    function successHandler(response) {
      $scope.ready = true;
    }

    if (authentication.isAuthenticated &&
      typeof CurrentUser.get().id !== 'undefined') {
      UserRepository.getById(CurrentUser.get().id)
        .then(CurrentUser.set)
        .then(successHandler)
    }
    else {
      authentication.logout();
      $state.transitionTo('login');
    }
  });
