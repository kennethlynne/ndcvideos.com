angular.module("demo", ['ngPaginatorPlz'])

  .controller('DemoController', ['$scope',
    function ($scope) {
      $scope.data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      $scope.target = [];
    }
  ]);