'use strict';

describe('Directive: uiSrefActive', function () {

    var element, scope, $compile;

    beforeEach(function () {

        module('ndc');

        inject(function ($rootScope, _$compile_) {
            scope = $rootScope.$new();
            $compile = _$compile_;
        });

    });

    xit('should set text', function () {
        element = angular.element('<p ui-sref-active></p>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.text()).toBe('this is the uiSrefActive directive');
    });
});
