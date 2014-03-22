'use strict';

describe('Controller(/video): VideoCtrl', function () {

    var VideoCtrl, scope;

    beforeEach(function () {

        module('ndc');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            VideoCtrl = $controller('VideoCtrl', {
                $scope: scope
            });
        });
    });

    xit('should attach init data to scope', function () {
        expect(scope.video).toEqual('video');
    });
});
