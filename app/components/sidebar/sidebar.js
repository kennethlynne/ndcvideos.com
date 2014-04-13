'use strict';

angular.module('ndc.components')
  .controller('sidebarComponentCtrl', function ($scope) {
  })
  .component('sidebar', function () {
    return {
      controller: 'sidebarComponentCtrl'
    };
  });
