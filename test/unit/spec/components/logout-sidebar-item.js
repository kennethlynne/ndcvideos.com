'use strict';

describe('Component: logoutSidebarItemComponent', function () {

  describe('Directive: logoutSidebarItemComponent', function () {
    var element, scope, $compile;

    beforeEach(function () {

      module('ndc');

      inject(function ($rootScope, _$compile_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
      });

    });

    it('should have the component class', function () {
      element = angular.element('<logout-sidebar-item-component></logout-sidebar-item-component>');
      element = $compile(element)(scope);
      scope.$digest();
      expect(element).toHaveClass('logout-sidebar-item-component');
    });

    it('should render text', function () {
      element = angular.element('<logout-sidebar-item-component></logout-sidebar-item-component>');
      element = $compile(element)(scope);
      scope.$digest();
      expect(element.text()).toContain('logoutSidebarItem');
    });

  });

  describe('Controller: logoutSidebarItemComponentCtrl', function () {

    var Ctrl, scope, element;

    beforeEach(function () {

      module('ndc');

      inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        element = angular.element('<logout-sidebar-item-component></logout-sidebar-item-component>');
        Ctrl = $controller('logoutSidebarItemComponentCtrl', {
          $scope: scope,
          $element: element
        });
      });
    });

    it('should render a message', function () {
      expect(scope.text).toContain('logoutSidebarItem');
    });
  });

});