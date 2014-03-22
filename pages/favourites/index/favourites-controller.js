'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('favourites', stateFactory('Favourites', {
            url:'/favourites',
            templateUrl: 'pages/favourites/index/main-view.html'
        }));
    })
    .controller('FavouritesCtrl', function ($scope, $log, CurrentUser, FavoriteRepository) {
        var user = CurrentUser.get();

        //TODO: Get by actual user ID
        FavoriteRepository.getAllByUserId(1).then(function (favourites) {
            if (favourites.length > 0) {
                $scope.favourites = favourites;
            }
            else
            {
                $scope.noFavorites = true;
            }
        });
    });