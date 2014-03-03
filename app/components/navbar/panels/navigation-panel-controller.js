'use strict';

angular.module('ndc')
    .controller('navbarNavigationPanelCtrl', function ($scope, TagRepository) {
        $scope.tags = []; //This variable holds selected tags

        $scope.select2Options = {
            multiple: true,
            query: function (query) {
                TagRepository.search(query.term).then(function (data) {
                    query.callback({results: data});
                });
            }
        };
    });