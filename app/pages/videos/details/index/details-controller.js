'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('videoDetails', stateFactory('Details', {
            url: '/videos/{videoId}',
            templateUrl: 'pages/videos/details/index/views/main-view.html'
        }));
    })
    .service('DetailsCtrlInit', function ($q, $log, $stateParams, $state, VideoContext) {

        var dependancies = [VideoContext.getById(2)],

                finishedCb = function (response) {
                $log.log('DetailsCtrl loaded. Data:', response);
                return response;
            };

        return {
            prepare: function () {
                $log.log('DetailsCtrl loading');
                return $q.all(dependancies).then(finishedCb);
            }
        }

    })
    .controller('DetailsCtrl', function ($scope, init) {

        $scope.video = init[0];

    });
