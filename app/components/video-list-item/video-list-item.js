'use strict';
angular.module('ndc.components')
    .component('videoListItem', function () {
        return {
            scope: {
                video: '='
            }
        };
    });
