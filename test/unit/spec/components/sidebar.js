'use strict';

describe('Component: sidebarComponent', function () {

  describe('Directive: sidebarComponent', function () {
    var element, scope, $compile;

    beforeEach(function () {

      module('ndc');

      inject(function ($rootScope, _$compile_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
      });

    });

    it('should have the component class', function () {
      element = angular.element('<sidebar-component></sidebar-component>');
      element = $compile(element)(scope);
      scope.$digest();
      expect(element).toHaveClass('sidebar-component');
    });

  });

  describe('Controller: sidebarComponentCtrl', function () {

    var Ctrl, scope, element;

    beforeEach(function () {

      module('ndc');

      inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        element = angular.element('<sidebar-component></sidebar-component>');
        Ctrl = $controller('sidebarComponentCtrl', {
          $scope: scope,
          $element: element
        });
      });
    });

  });

});