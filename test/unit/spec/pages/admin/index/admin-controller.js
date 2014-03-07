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