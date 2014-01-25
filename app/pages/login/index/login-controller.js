'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) { $stateProvider.state('login', stateFactory('Login', {url:'/login', templateUrl: 'pages/login/index/views/main-view.html'})) })
    .service('LoginCtrlInit', function ($q, $log) {

        var _prepare = function () {
            $log.log("LoginCtrl loading");

            return $q.all([]).then(function (data) {
                $log.log("LoginCtrl loaded!");

                var init = {};

                return init;
            });
        };

        return {
            prepare: _prepare
        }

    })
    .controller('LoginCtrl', function ($scope, init, authentication) {
        $scope.data = init;

        $scope.login = function (username, password) {
            authentication.login('password', username, password);
        };
    });
