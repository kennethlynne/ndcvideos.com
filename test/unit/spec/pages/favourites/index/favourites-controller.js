'use strict';

describe('Controller(/favourites): FavouritesCtrl', function () {

    var FavouritesCtrl, scope, deferred, $q, promise, $rootScope, CurrentUser, FavoriteRepository;

    beforeEach(function () {

        module('ndc');

        inject(function ($controller, _$rootScope_, _$q_, UserModel) {

            function getPromise() {
                return promise;
            }

            FavoriteRepository = {
                getAllByUserId: jasmine.createSpy('FavoriteRepository.getAllByUserId').andCallFake(getPromise)
            };

            CurrentUser = {
                get: jasmine.createSpy("CurrentUser.get").andCallFake(function () {
                        return new UserModel({userName: 'Root', favourites: [1, 2, 3]});
                    }
                )
            };

            scope = _$rootScope_.$new();
            $q = _$q_;
            deferred = $q.defer();
            promise = deferred.promise;
            $rootScope = _$rootScope_;

            FavouritesCtrl = $controller('FavouritesCtrl', {
                $scope: scope,
                CurrentUser: CurrentUser,
                FavoriteRepository: FavoriteRepository
            });
        });
    });

    it('should attach favourites to scope', function () {
        deferred.resolve([1,2,3]);
        $rootScope.$digest();
        expect(scope.favourites.length).toBe(3);
    });

});
