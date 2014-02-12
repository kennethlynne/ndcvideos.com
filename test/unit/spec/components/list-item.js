'use strict';

describe('Component: listItemComponent', function () {

    describe('Directive: listItemComponent', function () {
        var element, scope, $compile;

        beforeEach(function () {

            module('ndc');

            inject(function ($rootScope, _$compile_) {
                scope = $rootScope.$new();
                $compile = _$compile_;
            });

        });

        it('should have the component class', function() {
            element = angular.element('<list-item-component></list-item-component>');
            element = $compile(element)(scope);
            scope.$digest();
            expect(element).toHaveClass('list-item-component');
        });

    });

    describe('Controller: listItemComponentCtrl', function () {

        var Ctrl, scope, element;

        beforeEach(function () {

            module('ndc.components');

            inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                element = angular.element('<list-item-component></list-item-component>');
                Ctrl = $controller('listItemComponentCtrl', {
                    $scope: scope,
                    $element: element
                });
            });
        });

        it('should render a message', function () {
            expect(scope.text).toEqual('this is the listItem component');
        });
    });

});