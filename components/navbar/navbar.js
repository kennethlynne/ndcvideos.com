'use strict';
//TODO: Add water and unit tests!
angular.module('ndc.components')
    .controller('navbarComponentCtrl', function ($scope, $element, authentication, $location, navbar) {
        $scope.signout = function () {
            if (confirm('Are you sure you want to log out?') == true) {
                authentication.logout();
                $location.path('/login');
            }
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
