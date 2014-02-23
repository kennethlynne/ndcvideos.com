'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('agenda', stateFactory('Agenda', {
            url:'/agenda',
            templateUrl: 'pages/agenda/index/main-view.html'
        }));
    })
    .service('AgendaCtrlInit', function ($q, $log) {

        /**
         * An array of functions that return either a value or a promise.
         * For example:
         *      UserReposiitory.getAll()
         *      'Hello world'
         */
        var dependancies = [],

            /**
             * Callback that is called when all promises and values are resolved.
             * It is called with an array with the resolved values corresponding to the dependancy array.
             * The data returned from this function is injected into the controller as 'init'
             */
            finishedCb = function (response) {
                $log.log('AgendaCtrl loaded. Data:', response);
                return {};
            };

        return {
            prepare: function () {
                $log.log('AgendaCtrl loading');
                return $q.all(dependancies).then(finishedCb);
            }
        }

    })
    .controller('AgendaCtrl', function ($scope, init) {
        $scope.data = init;

    });
