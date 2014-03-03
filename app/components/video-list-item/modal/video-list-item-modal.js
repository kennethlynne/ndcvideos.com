'use strict';

//TODO: Add water and unit tests!
angular.module('ndc')
    .config(function ($stateProvider) {
        $stateProvider.state("videoDetails",
            {
                url: "/videos/{id}",
                onEnter: ['$stateParams', '$state', '$modal', 'VideoRepository', function ($stateParams, $state, $modal, VideoRepository) {
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
                            //TODO: Store progress information
                            return $state.transitionTo("index");
                        });
                }]
            }
        );
    })
    .controller('videoListItemModalCtrl', function ($scope, $modalInstance, video) {
        $scope.video = video;
        $scope.closeModal = function(){
            $modalInstance.close(/*TODO: Pass the progression of the video*/);
        };
    });