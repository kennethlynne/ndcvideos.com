'use strict';

//TODO: Add water and unit tests!
angular.module('ndc')
    .config(function ($stateProvider) {
        $stateProvider.state("videoDetails",
            {
                url: "/videos/{id}",
                onEnter: ['$stateParams', '$state', '$modal', 'VideoRepository', '$window', function ($stateParams, $state, $modal, VideoRepository, $window) {
                    $modal
                        .open({
                            backdrop: 'static',
                            templateUrl: 'components/video-list-item/modal/video-list-item-modal.html',
                            controller: 'videoListItemModalCtrl',
                            resolve: {
                                video: function () {
                                    return VideoRepository.getById($stateParams.id);
                                }
                            }
                        })
                        .result.then(function (result) {
                            $window.history.back();
                        });
                }],
                onExit: function () {
                    //TODO: Store progress information
                }
            }
        );
    })
    .controller('videoListItemModalCtrl', function ($scope, $modalInstance, video) {
        $scope.video = video;
        $scope.closeModal = function(){
            $modalInstance.close(/*TODO: Pass the progression of the video*/);
        };
    });