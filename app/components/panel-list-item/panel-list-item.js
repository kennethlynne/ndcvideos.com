'use strict';

angular.module('ndc.components')
  .component('panelListItem', function () {
    return {
      scope: {
        item: '='
      }
    };
  });
