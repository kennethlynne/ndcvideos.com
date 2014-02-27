'use strict';

angular.module('ndc.components')
    .controller('navbarComponentCtrl', function ($scope, $element, authentication, $location, navbar) {
        $scope.signout = function () {
            authentication.logout();
            $location.path('/login');
        };

        $scope.isAuthenticated = function () {
            return authentication.isAuthenticated();
        };

        $scope.navbar = navbar;

    })
    .component('navbar', function () {
        return {
            controller: 'navbarComponentCtrl'
        };
    });
