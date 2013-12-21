'use strict';

var components = angular.module('ndcApp.components', []);
angular.componentFactory.moduleDecorator(components);

var app = angular.module('ndcApp', [
  'componentFactory',
  'ndcApp.components',
  'ngAnimate',
  'xeditable',
  'ajoslin.promise-tracker',
  'cgBusy',
  'chieffancypants.loadingBar',
  'ui.router',
  'restangular'
]);
angular.componentFactory.moduleDecorator(app);