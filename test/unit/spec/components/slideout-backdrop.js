'use strict';

describe('Component: slideoutBackdropComponent', function () {

  describe('Directive: slideoutBackdropComponent', function () {
    var element, scope, $compile;

    beforeEach(function () {

      module('ndc');

      inject(function ($rootScope, _$compile_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
      });

    });

    it('should have the component class', function () {
      element = angular.element('<slideout-backdrop-component></slideout-backdrop-component>');
      element = $compile(element)(scope);
      scope.$digest();
      expect(element).toHaveClass('slideout-backdrop-component');
    });

  });

  describe('Controller: slideoutBackdropComponentCtrl', function () {

    var Ctrl, scope, element;

    beforeEach(function () {

      module('ndc');

      inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        element = angular.element('<slideout-backdrop-component></slideout-backdrop-component>');
        Ctrl = $controller('slideoutBackdropComponentCtrl', {
          $scope: scope,
          $element: element
        });
      });
    });

  });

});