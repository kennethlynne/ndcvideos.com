'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('videoDetails', stateFactory('VideoDetails', {
            url: '/videos/{videoId}',
            templateUrl: 'pages/videos/details/index/main-view.html'
        }));
    })
    .service('VideoDetailsCtrlInit', function ($q, $log, VideoRepository, $state) {


        var _prepare = function () {
            $log.log("VideoDetailsCtrl loading");

            var dependencies = [
                VideoRepository.getById(1)
            ];

            return $q.all(dependencies).then(function (data) {
                $log.log("VideoDetailsCtrl loaded!");
                return data[0];
            });
        };

        return {
            prepare: _prepare
        }

    })
    .controller('VideoDetailsCtrl', function ($scope, $stateParams, VideoRepository, $state, init) {

            $scope.video = init;
/*
            .then(function (result) {
                $scope.video = result;
            })
            .catch(function (reason) {
                $state.go('error', {code: 404});
            });
*/

    });