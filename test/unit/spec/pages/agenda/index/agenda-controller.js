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
        
    });
});
