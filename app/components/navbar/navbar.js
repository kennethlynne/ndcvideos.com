'use strict';

angular.module('ndc.components')
    .controller('navbarComponentCtrl', function ($scope, $element, authentication, $location) {
        $scope.signout = function () {
            authentication.logout();
            $location.path('/login');
        };

        $scope.isAuthenticated = function () {
            return authentication.isAuthenticated();
        };
    })
    .component('navbar', function () {
        return {
            controller: 'navbarComponentCtrl'
        };
    });
