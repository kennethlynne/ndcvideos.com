'use strict';

angular.module('ndc.components')
    .controller('searchComponentCtrl', function ($scope, $timeout) {

    })
    .component('search', function () {
        return {
            controller: 'searchComponentCtrl',
            scope:{
                onsubmitfn:'&', //Optional
                onchangefn:'&', //Optional
                queryModel:'='
            }
        };
    });
