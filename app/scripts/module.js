'use strict';

var components = angular.module('ndc.components', []);
angular.componentFactory.moduleDecorator(components);

var app = angular.module('ndc', [
    'kennethlynne.componentFactory',
    'ngSymbiosis.utils',
    'ngSymbiosis.repository',
    'ngSymbiosis.model',
    'ngSymbiosis.routeProvider',
    'ngSymbiosis.accessControl',
    'ndc.components',
    'ngAnimate',
    'ajoslin.promise-tracker',
    'cgBusy',
    'chieffancypants.loadingBar',
    'ui.router',
    'ui.bootstrap',
    'ngTouch',
    'ngStorage',
]);
angular.componentFactory.moduleDecorator(app);