'use strict';

describe('Component: navbarNavigationPanelCtrl', function () {

    describe('Controller: navbarNavigationPanelCtrl', function () {

        var Ctrl, scope;

        beforeEach(function () {

            module('ndc');

            inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                Ctrl = $controller('navbarNavigationPanelCtrl', {
                    $scope: scope
                });
            });
        });

        it('should expose tags');

    });

});
