'use strict';

angular.module('ndc.components')
  .controller('videoListComponentCtrl', function ($scope) {
  })
  .component('videoList', function () {
    return {
      controller: 'videoListComponentCtrl'
    };
  });