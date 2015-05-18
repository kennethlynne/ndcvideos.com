'use strict';

describe('Component: loginComponent', function () {

  describe('Directive: loginComponent', function () {
    var element, scope, $compile;

    beforeEach(function () {

      module('ndc');

      inject(function ($rootScope, _$compile_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
      });

    });

    it('should have the component class', function () {
      element = angular.element('<login-component></login-component>');
      element = $compile(element)(scope);
      scope.$digest();
      expect(element).toHaveClass('login-component');
    });

  });

});
