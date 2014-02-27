'use strict';

describe('Component: navbarMiniPlayerComponent', function () {

    describe('Directive: navbarMiniPlayerComponent', function () {
        var element, scope, $compile;

        beforeEach(function () {

            module('ndc');

            inject(function ($rootScope, _$compile_) {
                scope = $rootScope.$new();
                $compile = _$compile_;
            });

        });

        it('should have the component class', function() {
            element = angular.element('<navbar-mini-player-component></navbar-mini-player-component>');
            element = $compile(element)(scope);
            scope.$digest();
            expect(element).toHaveClass('navbar-mini-player-component');
        });

    });

    describe('Controller: navbarMiniPlayerComponentCtrl', function () {

        var Ctrl, scope, element;

        beforeEach(function () {

            module('ndc');

            inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                element = angular.element('<navbar-mini-player-component></navbar-mini-player-component>');
                Ctrl = $controller('navbarMiniPlayerComponentCtrl', {
                    $scope: scope,
                    $element: element
                });
            });
        });

        it('should render a message', function () {
            expect(scope.text).toEqual('this is the navbarMiniPlayer component');
        });
    });

});