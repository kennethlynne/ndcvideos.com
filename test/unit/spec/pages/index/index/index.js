'use strict';

describe('Controller: IndexCtrl', function () {

    var IndexCtrl, scope, $state;

    $state = {
        go: jasmine.createSpy('$state.go')
    };

    beforeEach(function () {

        module('ndc');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            IndexCtrl = $controller('IndexCtrl', {
                $scope: scope,
                init: 'DATA',
                $state: $state
            });
        });
    });

    xit('should attach init data to scope', function () {
        expect(scope.data).toEqual('DATA');
    });

    it('should redirect to login if the user is not authorized', function() {
        expect($state.go).toHaveBeenCalled();
    });
});

describe('Service: IndexCtrlInit', function () {

    var IndexCtrlInit;

    beforeEach(function () {

        module('ndc');

        inject(function (_IndexCtrlInit_) {
            IndexCtrlInit = _IndexCtrlInit_;
        });

    });


    it('should have a prepare function', function () {
        expect(typeof IndexCtrlInit.prepare).toEqual('function');
    });

});