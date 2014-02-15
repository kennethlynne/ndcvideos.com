'use strict';

describe('Controller(/favourites): FavouritesCtrl', function () {

    var FavouritesCtrl, scope, favourites,
        UserRepository, deferred, $q, promise, $rootScope;

    beforeEach(function () {

        module('ndc');

        inject(function ($controller, _$rootScope_, _$q_) {
            scope = _$rootScope_.$new();
            $q = _$q_;
            deferred = $q.defer();
            promise = deferred.promise;
            $rootScope = _$rootScope_;
            FavouritesCtrl = $controller('FavouritesCtrl', {
                $scope: scope,
                $log:null
            });
        });
    });

    xit('should attach favourites to scope', function () {

        deferred.resolve(favourites);
        $rootScope.$digest();
        expect(scope.favourites).toEqual(favourites);

    });




});
