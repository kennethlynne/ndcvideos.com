'use strict';

angular.module('ndc.components')
    .controller('slideoutBackdropComponentCtrl', function ($scope, stateHistory) {
        $scope.close = function () {
            stateHistory.back();
        }
    })
    .component('slideoutBackdrop', function () {
        return {
            controller: 'slideoutBackdropComponentCtrl'
        };
    });
