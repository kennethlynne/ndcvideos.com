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

    function failHandler() {
      authentication.logout();
      $state.transitionTo('login');
    }

    if (authentication.isAuthenticated()) {
      UserRepository.getByToken(authentication.getToken())
        .then(CurrentUser.set)
        .then(successHandler)
        .catch(failHandler);
    }
    else {
      failHandler();
    }
  });
