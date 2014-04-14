'use strict';

angular.module('ndc.components')
  .controller('panelListComponentCtrl', function ($scope) {
    $scope.listItems = [
      {
        title: 'Videos',
        uiSref: 'videos',
        cssClass: ['icon-camcorder']
      },
      {
        title: 'Favorites',
        uiSref: 'favorites',
        cssClass: ['icon-heart']
      },
      {
        title: 'Admin',
        uiSref: 'admin',
        cssClass: ['icon-lock']
      }
    ];
  })
  .component('panelList', function () {
    return {
      controller: 'panelListComponentCtrl'
    };
  });
