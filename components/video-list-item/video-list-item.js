'use strict';
angular.module('ndc.components')
    .controller('videoListItemComponentCtrl', function($scope, FavoriteModel){



        $scope.addFavorite = function(video){


        };





    })
    .component('videoListItem', function () {
        return {
            scope: {
                video: '='
            }
        };
    });
