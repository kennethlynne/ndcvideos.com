'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('Index', stateFactory('Index', {url:'/'}))
    })
    .service('IndexCtrlInit', function ($q, $log) {

        var _prepare = function () {
            $log.log("IndexCtrl loading");

            return $q.all([]).then(function (data) {
                $log.log("IndexCtrl loaded!");
                return {}
            });
        };

        return {
            prepare: _prepare
        }

    })
    .controller('IndexCtrl', function ($scope, VideoContext, authentication, $state) {

        if (!authentication.isAuthenticated()) {
            $state.go('login');
        }

        VideoContext.getAll().then(function (response) {
            $scope.videos = response;
        });
        
    });
