'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('login', stateFactory('Login', {url:'/login', templateUrl: 'pages/login/index/main-view.html'}))
    })
    .controller('LoginCtrl', function ($scope, authentication, $state) {

        if (authentication.isAuthenticated()) {
            $state.go('index');
        }

        $scope.login = function (username, password) {
            $scope.working = true;

            authentication.login('password', username, password)
                .then(function (isLoggedIn) {
                    if(isLoggedIn) $state.go('index');
                })
                .catch(function (reason) {
                    alert(reason);
                })
                .finally(function () {
                    $scope.working = false;
                })
        };

        //TODO: Refactor into directive or something
        setEyecatcherFullHeight();
        $( window ).resize(function() {
            setEyecatcherFullHeight();
        });

        function setEyecatcherFullHeight() {
            $(".eyecatcher.full-height").css({
                "height": $(window).height()
            });
        }

    });
