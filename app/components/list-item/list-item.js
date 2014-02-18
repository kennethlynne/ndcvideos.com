'use strict';

angular.module('ndc.components')
    .controller('listItemComponentCtrl', function ($scope, $element) {
        $scope.text = 'this is the listItem component';

        $('#videoModal').modal({
            show: false,
            backdrop: "static"
        });

        $(".has-tooltip").tooltip();
    })
    .component('listItem', function () {
        return {
            controller: 'listItemComponentCtrl'
        };
    });
