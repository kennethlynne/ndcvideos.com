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
    .controller('IndexCtrl', function ($scope, init) {
        $scope.videos = [
            {id: '1', title: 'Title', description: 'desc', duration: 1234, vimeoId: 123},
            {id: '2', title: 'Titl2e', description: 'desc', duration: 12324, vimeoId: 1223}
        ];
    });
