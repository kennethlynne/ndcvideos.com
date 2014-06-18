'use strict';

describe('Component: loginSidebarItemComponent', function () {

  describe('Directive: loginSidebarItemComponent', function () {
    var element, scope, $compile;

    beforeEach(function () {

      module('ndc');

      inject(function ($rootScope, _$compile_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
      });

    });

    it('should have the component class', function () {
      element = angular.element('<login-sidebar-item-component></login-sidebar-item-component>');
      element = $compile(element)(scope);
      scope.$digest();
      expect(element).toHaveClass('login-sidebar-item-component');
    });

    it('should render text', function () {
      element = angular.element('<login-sidebar-item-component></login-sidebar-item-component>');
      element = $compile(element)(scope);
      scope.$digest();
      expect(element.text()).toContain('loginSidebarItem');
    });

  });

  describe('Controller: loginSidebarItemComponentCtrl', function () {

    var Ctrl, scope, element;

    beforeEach(function () {

      module('ndc');

      inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        element = angular.element('<login-sidebar-item-component></login-sidebar-item-component>');
        Ctrl = $controller('loginSidebarItemComponentCtrl', {
          $scope: scope,
          $element: element
        });
      });
    });

    it('should render a message', function () {
      expect(scope.text).toContain('loginSidebarItem');
    });
  });

});