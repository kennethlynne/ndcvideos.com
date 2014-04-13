'use strict';

angular.module('ndc.components')
  .controller('panelListItemComponentCtrl', function ($scope, $element) {
  })
  .component('panelListItem', function () {
    return {
      controller: 'panelListItemComponentCtrl',
      scope: {
        item: '='
      }
    };
  });
