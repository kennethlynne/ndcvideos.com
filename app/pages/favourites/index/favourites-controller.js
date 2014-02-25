'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('favourites', stateFactory('Favourites', {
            url:'/favourites',
            templateUrl: 'pages/favourites/index/main-view.html'
        }));
    })
    .controller('FavouritesCtrl', function ($scope, $log, CurrentUser, UserModel) {

        $scope.checkIfEmpty = function ()
        {
            if(!!$scope.favourites == false || $scope.favourites.length < 1)
            {
                $scope.errormsg = 'No favourites yet! Try adding some :)';
            }
        };

        var user = CurrentUser.get();
        if(!(user instanceof UserModel))
        {
            $scope.$watch(function () { return CurrentUser.get(); }, function (newUser)
            {
                $scope.favourites = newUser.favourites;
                $scope.checkIfEmpty();
            });
        }
        else
        {
            $scope.favourites = user.favourites;
            $scope.checkIfEmpty();
        }

    });