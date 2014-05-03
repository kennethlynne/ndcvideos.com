'use strict';

angular.module('ndc.components')
  .controller('paginatorComponentCtrl', function ($scope, Paginator, $log) {
    if (!$scope.paginator instanceof Paginator) {
      $log.error($scope.paginator, 'is not a valid Paginator');
    }
  })
  .component('paginator', function () {
    return {
      scope: {
        paginator: '='
      },
      controller: 'paginatorComponentCtrl'
    };
  });