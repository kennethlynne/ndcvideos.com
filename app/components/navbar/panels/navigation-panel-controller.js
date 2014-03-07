'use strict';

angular.module('ndc')
    .controller('navbarNavigationPanelCtrl', function ($scope, TagRepository, CurrentUser) {
        $scope.tags = []; //This variable holds selected tags

        $scope.User = CurrentUser;

        $scope.select2Options = {
            multiple: true,
            query: function (query) {
                TagRepository.search(query.term).then(function (data) {
                    query.callback({results: data});
                });
            }
        };
    });