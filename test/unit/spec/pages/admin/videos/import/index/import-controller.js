'use strict';

describe('Controller(/admin/videos/import-controller): AdminImportVideoCtrl', function () {

    var Ctrl, scope;

    beforeEach(function () {

        module('ndc');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            Ctrl = $controller('AdminImportVideoCtrl', {
                $scope: scope,
                $modal: {},
                $modalInstance: {}
            });
        });
    });

    it('should attach init data to scope', function () {

    });
});
