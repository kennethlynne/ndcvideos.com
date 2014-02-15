'use strict';

describe('Controller(/agenda): AgendaCtrl', function () {

    var AgendaCtrl, scope;

    beforeEach(function () {

        module('ndc');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            AgendaCtrl = $controller('AgendaCtrl', {
                $scope: scope,
                init: 'DATA'
            });
        });
    });

    it('should attach init data to scope', function () {
        expect(scope.data).toEqual('DATA');
    });
});

describe('Service(/agenda): AgendaCtrlInit', function () {

    var AgendaCtrlInit;

    beforeEach(function () {

        module('ndc');

        inject(function (_AgendaCtrlInit_) {
            AgendaCtrlInit = _AgendaCtrlInit_;
        });

    });

    it('should have a prepare function', function () {
        expect(typeof AgendaCtrlInit.prepare).toEqual('function');
    });

    it('should return a promise', function () {
        expect(typeof AgendaCtrlInit.prepare().then).toEqual('function');
    });

});