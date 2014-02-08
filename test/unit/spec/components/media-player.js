'use strict';

describe('Component: mediaPlayerComponent', function () {

    describe('Directive: mediaPlayerComponent', function () {
        var element, scope, $compile;

        beforeEach(function () {

            module('ndc');

            inject(function ($rootScope, _$compile_) {
                scope = $rootScope.$new();
                $compile = _$compile_;
            });

        });

        it('should have the component class', function() {
            element = angular.element('<media-player-component></media-player-component>');
            element = $compile(element)(scope);
            scope.$digest();
            expect(element).toHaveClass('media-player-component');
        });

        it('should render a vimeo video', function() {
            element = angular.element('<media-player-component video="//player.vimeo.com/video/23919731" height="281" width="500"></media-player-component>');
            element = $compile(element)(scope);
            scope.$digest();

            expect(element.html()).toContain('vimeo');
        });

    });

    describe('Controller: mediaPlayerComponentCtrl', function () {

        var Ctrl, scope, element;

        beforeEach(function () {

            module('ndc');

            inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                element = angular.element('<media-player-component video="//player.vimeo.com/video/23919731" height="281" width="500"></media-player-component>');
                Ctrl = $controller('mediaPlayerComponentCtrl', {
                    $scope: scope,
                    $element: element
                });
            });
        });

        xit('should render a message', function () {
        });
    });

});