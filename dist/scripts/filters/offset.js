'use strict';

angular.module('ndc')
    .filter('offset', function () {
        return function (input, offset) {
            return input.slice(+offset);
        }
    });