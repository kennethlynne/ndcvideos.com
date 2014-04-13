'use strict';

angular.module('ndc.components')
  .controller('navbarComponentCtrl', function ($scope) {
  })
  .component('navbar', function () {
    return {
      controller: 'navbarComponentCtrl'
    };
  });