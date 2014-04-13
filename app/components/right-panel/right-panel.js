'use strict';

angular.module('ndc.components')
  .controller('rightPanelComponentCtrl', function ($scope) {
  })
  .component('rightPanel', function () {
    return {
      controller: 'rightPanelComponentCtrl'
    };
  });
