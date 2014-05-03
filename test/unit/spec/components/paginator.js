'use strict';

describe('Component: paginatorComponent', function () {

  describe('Directive: paginatorComponent', function () {
    var element, scope, $compile;

    beforeEach(function () {

      module('ndc');

      inject(function ($rootScope, _$compile_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
      });

    });

    it('should have the component class', function () {
      element = angular.element('<paginator-component></paginator-component>');
      element = $compile(element)(scope);
      scope.$digest();
      expect(element).toHaveClass('paginator-component');
    });

  });

  describe('Controller: paginatorComponentCtrl', function () {

    var Ctrl, scope;

    beforeEach(function () {

      module('ndc');

      inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        Ctrl = $controller('paginatorComponentCtrl', {
          $scope: scope
        });
      });
    });

  });

});