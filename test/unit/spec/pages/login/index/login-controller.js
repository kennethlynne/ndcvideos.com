'use strict';

describe('Controller(/login): LoginCtrl', function () {

    var LoginCtrl, scope;

    beforeEach(function () {

        module('ndc');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            LoginCtrl = $controller('LoginCtrl', {
                $scope: scope,
                init: 'DATA'
            });
        });
    });

    it('should attach init data to scope', function () {
        expect(scope.data).toEqual('DATA');
    });
});

describe('Service(/login): LoginCtrlInit', function () {

    var LoginCtrlInit;

    beforeEach(function () {

        module('ndc');

        inject(function (_LoginCtrlInit_) {
            LoginCtrlInit = _LoginCtrlInit_;
        });

    });

    it('should have a prepare function', function () {
        expect(typeof LoginCtrlInit.prepare).toEqual('function');
    });

    it('should return a promise', function () {
        expect(typeof LoginCtrlInit.prepare().then).toEqual('function');
    });

});