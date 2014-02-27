'use strict';

angular.module('ndc.components')
    .controller('videoListItemComponentCtrl', function ($scope, $element, $modal, $log) {

        $scope.openModal = function () {

            var modalInstance = $modal.open({
                backdrop: 'static',
                templateUrl: 'components/video-list-item/modal/video-list-item-modal.html',
                controller: 'VideoListItemModalCtrl',
                resolve: {
                    video: function () {
                        return $scope.video;
                    }
                }
            });


            modalInstance.result.then(function (progress) {
                //TODO: Store progress information
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };


    })
    .component('videoListItem', function () {
        return {
            controller: 'videoListItemComponentCtrl',
            scope:{
                video:'='
            }
        };
    });
