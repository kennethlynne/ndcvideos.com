'use strict';

var components = angular.module('ndc.components', []);
angular.componentFactory.moduleDecorator(components);

var app = angular.module('ndc', [
  'kennethlynne.componentFactory',
  'ngSymbiosis.utils',
  'ngSymbiosis.routeProvider',
  'ngSymbiosis.repository',
  'ngSymbiosis.accessControl',
  'ngSymbiosis.model',
  'ndc.components',
  'ngAnimate',
  'ajoslin.promise-tracker',
  'chieffancypants.loadingBar',
  'ui.router',
  'ui.bootstrap',
  'ngTouch',
  'ngStorage',
  'ui.select2',
  'cgBusy',
  'ngRoles'
]);
angular.componentFactory.moduleDecorator(app);