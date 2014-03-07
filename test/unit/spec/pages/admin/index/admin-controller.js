'use strict';

describe('Controller(/admin): AdminCtrl', function () {

    var AdminCtrl, scope;

    beforeEach(function () {

        module('ndc');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            AdminCtrl = $controller('AdminCtrl', {
                $scope: scope,
                init: 'DATA'
            });
        });
    });

    it('should attach init data to scope', function () {
        expect(scope.data).toEqual('DATA');
    });
});

describe('Service(/admin): AdminCtrlInit', function () {

    var AdminCtrlInit;

    beforeEach(function () {

        module('ndc');

        inject(function (_AdminCtrlInit_) {
            AdminCtrlInit = _AdminCtrlInit_;
        });

    });

    it('should have a prepare function', function () {
        expect(typeof AdminCtrlInit.prepare).toEqual('function');
    });

    it('should return a promise', function () {
        expect(typeof AdminCtrlInit.prepare().then).toEqual('function');
    });

});