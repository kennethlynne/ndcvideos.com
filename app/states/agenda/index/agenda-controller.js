'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('agenda', stateFactory('Agenda', {
      url: '/agenda',
      templateUrl: 'states/agenda/index/main-view.html',
      parent: 'app'
    }));
  })
  .controller('AgendaCtrl', function ($scope) {
  });
