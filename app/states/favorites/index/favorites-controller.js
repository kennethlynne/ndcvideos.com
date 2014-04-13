'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('favorites', stateFactory('Favorites', {
      url: '/favorites',
      templateUrl: 'states/favorites/index/main-view.html',
      parent: 'app'
    }));
  })
  .controller('FavoritesCtrl', function ($scope, $log, CurrentUser, FavoriteRepository) {
    var user = CurrentUser.get();

    //TODO: Get by actual user ID
    FavoriteRepository.getAllByUserId(1).then(function (favorites) {
      $scope.favorites = favorites;
    });
  });
