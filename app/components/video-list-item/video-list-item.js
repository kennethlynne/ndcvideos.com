'use strict';

angular.module('ndc.components')
  .controller('videoListItemComponentCtrl', function ($scope) {
  })
  .component('videoListItem', function () {
    return {
      scope: {
        video: '='
      },
      controller: 'videoListItemComponentCtrl'
    };
  });