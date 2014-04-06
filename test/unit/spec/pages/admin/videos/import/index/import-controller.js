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

    it('should publish a video', function () {
        scope.publish();

        expect().toEqual('bar');
    });

});
