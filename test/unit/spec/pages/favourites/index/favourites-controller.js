'use strict';

describe('Controller(/favourites): FavouritesCtrl', function () {

    var FavouritesCtrl, scope;

    beforeEach(function () {

        module('ndc');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            FavouritesCtrl = $controller('FavouritesCtrl', {
                $scope: scope,
                init: 'DATA'
            });
        });
    });

    it('should attach init data to scope', function () {
        expect(scope.data).toEqual('DATA');
    });
});

describe('Service(/favourites): FavouritesCtrlInit', function () {

    var FavouritesCtrlInit;

    beforeEach(function () {

        module('ndc');

        inject(function (_FavouritesCtrlInit_) {
            FavouritesCtrlInit = _FavouritesCtrlInit_;
        });

    });

    it('should have a prepare function', function () {
        expect(typeof FavouritesCtrlInit.prepare).toEqual('function');
    });

    it('should return a promise', function () {
        expect(typeof FavouritesCtrlInit.prepare().then).toEqual('function');
    });

});