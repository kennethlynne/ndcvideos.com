'use strict';

angular.module('ndc.components')
    .controller('navbarComponentCtrl', function ($scope, $element, authentication, $location) {
        $scope.signout = function () {
            authentication.logout();
            $location.path('/login');
        }
    })
    .component('navbar', function () {
        return {
            controller: 'navbarComponentCtrl'
        };
    });
