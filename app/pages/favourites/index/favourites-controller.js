'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('favourites', stateFactory('Favourites', {
            url:'/favourites',
            templateUrl: 'pages/favourites/index/main-view.html'
        }));
    })
    .service('FavouritesCtrlInit', function ($q, $log) {

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
                $log.log('FavouritesCtrl loaded. Data:', response);
                return {};
            };

        return {
            prepare: function () {
                $log.log('FavouritesCtrl loading');
                return $q.all(dependancies).then(finishedCb);
            }
        }

    })
    .controller('FavouritesCtrl', function ($scope, init) {
        $scope.data = init;
    });
