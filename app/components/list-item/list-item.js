'use strict';

angular.module('ndc.components')
    .controller('listItemComponentCtrl', function ($scope, $element) {
        $scope.text = 'this is the listItem component';
    })
    .component('listItem', function () {
        return {
            controller: 'listItemComponentCtrl'
        };
    });
