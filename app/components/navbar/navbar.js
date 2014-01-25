'use strict';

angular.module('ndc.components')
    .controller('navbarComponentCtrl', function ($scope, $element) {
        $scope.text = 'this is the navbar component';
    })
    .component('navbar', function () {
        return {
            controller: 'navbarComponentCtrl'
        };
    });
