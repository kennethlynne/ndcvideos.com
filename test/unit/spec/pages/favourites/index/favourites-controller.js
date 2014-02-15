'use strict';

describe('Controller(/favourites): FavouritesCtrl', function () {

    var FavouritesCtrl, scope, favourites, deferred, $q, promise, $rootScope, CurrentUser;

    beforeEach(function () {

        module('ndc');


        CurrentUser = {
            get:function ()
            {
                return {favourites:[1, 2, 3]};
            }};

        inject(function ($controller, _$rootScope_, _$q_) {
            scope = _$rootScope_.$new();
            $q = _$q_;
            deferred = $q.defer();

            promise = deferred.promise;
            $rootScope = _$rootScope_;
            FavouritesCtrl = $controller('FavouritesCtrl', {
                $scope: scope,
                $log:null,
                CurrentUser:CurrentUser
            });
        });
    });

    it('should attach favourites to scope', function () {

        deferred.resolve(favourites);
        $rootScope.$digest();
        expect(scope.favourites.length).toBe(3);

    });

});
