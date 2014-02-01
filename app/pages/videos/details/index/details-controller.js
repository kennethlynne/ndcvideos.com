'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('details', stateFactory('Details', {
            url:'/videos/{videoId}',
            templateUrl: 'pages/videos/details/index/views/main-view.html'
        }));
    })
    .controller('DetailsCtrl', function ($scope, $stateParams, videoContext) {

        videoContext.getById($stateParams.videoId)
        .then(function (result)
        {
            $scope.video = result;
        });
    });
