'use strict';

angular.module('ndc.components')
  .controller('tagListComponentCtrl', function ($scope, $element) {
    $scope.text = 'tagList component';
  })
  .component('tagList', function () {
    return {
      controller: 'tagListComponentCtrl',
      scope:{
        tags:'='
      }
    };
  });