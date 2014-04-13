'use strict';

describe('Controller(/favorites): FavoritesCtrl', function () {

  var favoritesCtrl, scope, deferred, $q, promise, $rootScope, CurrentUser, FavoriteRepository;

  beforeEach(function () {

    module('ndc');

    inject(function ($controller, _$rootScope_, _$q_, UserModel) {

      function getPromise() {
        return promise;
      }

      FavoriteRepository = {
        getAllByUserId: jasmine.createSpy('FavoriteRepository.getAllByUserId').and.callFake(getPromise)
      };

      CurrentUser = {
        get: jasmine.createSpy("CurrentUser.get").and.callFake(function () {
            return new UserModel({userName: 'Root', favorites: [1, 2, 3]});
          }
        )
      };

      scope = _$rootScope_.$new();
      $q = _$q_;
      deferred = $q.defer();
      promise = deferred.promise;
      $rootScope = _$rootScope_;

      favoritesCtrl = $controller('FavoritesCtrl', {
        $scope: scope,
        CurrentUser: CurrentUser,
        FavoriteRepository: FavoriteRepository
      });
    });
  });

  it('should attach favorites to scope', function () {
    deferred.resolve([1, 2, 3]);
    $rootScope.$digest();
    expect(scope.favorites.length).toBe(3);
  });

});
