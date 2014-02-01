'use strict';

describe('Controller: IndexCtrl', function () {

    var IndexCtrl, scope;

    beforeEach(function () {

        module('ndc');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            IndexCtrl = $controller('IndexCtrl', {
                $scope: scope
            });
        });
    });

    it('should attach a video to scope');
    
});
