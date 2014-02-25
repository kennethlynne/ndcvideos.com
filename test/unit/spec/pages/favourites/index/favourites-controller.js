'use strict';

describe('Controller(/favourites): FavouritesCtrl', function () {

    var FavouritesCtrl, scope, favourites, deferred, $q, promise, $rootScope, CurrentUser, checkIfEmpty;

    beforeEach(function () {

        module('ndc');

//        checkIfEmpty = jasmine.createSpy("checkIfEmpty");

        inject(function ($controller, _$rootScope_, _$q_, UserModel) {

            CurrentUser = {
                get:jasmine.createSpy("CurrentUser.get").andCallFake(function ()
                {
                    return new UserModel({userName:'balle', favourites:[1, 2, 3]});;
                })};

            scope = _$rootScope_.$new();
            $q = _$q_;
            deferred = $q.defer();
            promise = deferred.promise;
            $rootScope = _$rootScope_;

            FavouritesCtrl = $controller('FavouritesCtrl', {
                $scope: scope,
                $log:null,
                CurrentUser:CurrentUser,
                UserModel:UserModel
            });
        });
    });

    it('should attach favourites to scope', function () {
        deferred.resolve(favourites);
        $rootScope.$digest();
        expect(scope.favourites.length).toBe(3);
    });

    it('should check if favourites are empty', function () {
        deferred.resolve(favourites);
        $rootScope.$digest();

        scope.checkIfEmpty();

        expect(scope.errormsg).toBeFalsy();
    });

});
