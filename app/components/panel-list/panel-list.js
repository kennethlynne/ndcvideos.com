'use strict';

angular.module('ndc.components')
  .controller('panelListComponentCtrl', function ($scope) {
    $scope.listItems = [
      {
        title: 'Videos',
        uiSref: 'videos',
        cssClass: ['glyphicon', 'glyphicon-play']
      },
      {
        title: 'Admin',
        uiSref: 'admin',
        cssClass: ['glyphicon', 'glyphicon-cog']
      }
    ];
  })
  .component('panelList', function () {
    return {
      controller: 'panelListComponentCtrl'
    };
  });
