'use strict';
//TODO: Add water and unit tests!
angular.module('ndc.components')
    .controller('navbarComponentCtrl', function ($scope, $element, authentication, $location, navbar) {
        $scope.signout = function () {
            var confirmed = confirm('Are you sure you want to log out?');
            if (confirmed == true) {
                authentication.logout();
                $location.path('/login');
            }
        };

        $scope.isAuthenticated = function () {
            return authentication.isAuthenticated();
        };

        // TODO
        $(".responsive-toggler").click(function() {
            $(".responsive-wrapper").toggleClass("open");
            $(this).find("i").toggleClass("fa-bars");
            $(this).find("i").toggleClass("fa-times");
        });

        $scope.navbar = navbar;

    })
    .component('navbar', function () {
        return {
            controller: 'navbarComponentCtrl'
        };
    });
