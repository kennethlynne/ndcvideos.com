'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('agenda', stateFactory('Agenda', {
            url:'/agenda',
            templateUrl: 'pages/agenda/index/main-view.html'
        }));
    })
    .controller('AgendaCtrl', function ($scope, VideoRepository) {


        VideoRepository.getAll().then(function(result){

            $scope.videos = result;
            console.log(result);

        });


    });
