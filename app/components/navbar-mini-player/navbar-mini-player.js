'use strict';

angular.module('ndc.components')
    .controller('navbarMiniPlayerComponentCtrl', function ($scope, $element) {
        $scope.text = 'this is the navbarMiniPlayer component';
    })
    .component('navbarMiniPlayer', function () {
        return {
            controller: 'navbarMiniPlayerComponentCtrl'
        };
    });
