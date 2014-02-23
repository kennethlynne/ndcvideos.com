'use strict';

angular.module('ndc.components')
    .controller('VideoListItemModalCtrl', function ($scope, $modalInstance, video) {

        /*
        * Missing unit tests!! ;D
        * */
        $scope.video = video;

        $scope.closeModal = function(){
            $modalInstance.close(/*Pass the progression of the video*/);
        };

});