'use strict';

describe('Controller(/admin/videos/import): AdminImportVideoCtrl', function () {

    var ImportCtrl, scope;

    beforeEach(function () {

        module('ndc');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            ImportCtrl = $controller('AdminImportVideoCtrl', {
                $scope: scope
            });
        });
    });

    xit('should attach init data to scope', function () {
        expect(scope.foo).toEqual('bar');
    });

});
