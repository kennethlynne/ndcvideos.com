'use strict';

var components = angular.module('ndc.components', []);
angular.componentFactory.moduleDecorator(components);

var app = angular.module('ndc', [
  'kennethlynne.componentFactory',
  'ngSymbiosis.utils',
  'ngSymbiosis.routeProvider',
  'ngSymbiosis.model',
  'ndc.components',
  'ngAnimate',
  'angular-loading-bar',
  'ui.router',
  'ui.bootstrap',
  'ngTouch',
  'ngStorage',
  'ui.select2',
  'cgBusy',
  'ngRoles',
  'ngPaginatorPlz'
]);
angular.componentFactory.moduleDecorator(app);
