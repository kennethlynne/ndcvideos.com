'use strict';

angular.module('ndc')
    .config(function ($stateProvider) {
        $stateProvider.state("adminImportVideo",
            {
                url: "/admin/videos/import",
                onEnter: ['$stateParams', '$state', '$modal', '$window', function ($stateParams, $state, $modal, $window) {
                    $modal
                        .open({
                            backdrop: 'static',
                            templateUrl: 'pages/admin/videos/import/index/start.html',
                            controller: 'AdminImportVideoCtrl'
                        })
                        .result
                        .then(function () {
                            $state.go('administrateVideos', {}, {inherit:false});
                        })
                        .catch(function () {
                            $state.go('administrateVideos', {}, {inherit:false});
                        })
                }],
                onExit: ['$state', function ($state) {
                    $state.go('administrateVideos');
                }]
            });
    })
    .controller('AdminImportVideoCtrl', function ($scope, $modalInstance) {
        $scope.closeModal = function () {
            $modalInstance.close();
        };
    });
