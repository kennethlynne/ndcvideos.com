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
    .controller('LoginCtrl', function ($scope, init, authentication, $state) {

        if (authentication.isAuthenticated()) {
            $state.go('index');
        }

        $scope.data = init;

        $scope.login = function (username, password) {
            $scope.working = true;

            authentication.login('password', username, password)
                .then(function (isLoggedIn) {
                    if(isLoggedIn) $state.go('Index');
                })
                .catch(function (reason) {
                    alert(reason);
                })
                .finally(function () {
                    $scope.working = false;
                })
        };
    });
