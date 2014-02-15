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

        $scope.getClass = function(path) {
            var cur_path = $location.path().substr(0, path.length);
            if (cur_path == path) {
                if($location.path().substr(0).length > 1 && path.length == 1 )
                    return "";
                else
                    return "active";
            } else {
                return "";
            }
        }
    })
    .component('navbar', function () {
        return {
            controller: 'navbarComponentCtrl'
        };
    });
