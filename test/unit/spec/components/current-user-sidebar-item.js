'use strict';

describe('Component: currentUserSidebarItemComponent', function () {

  describe('Directive: currentUserSidebarItemComponent', function () {
    var element, scope, $compile;

    beforeEach(function () {

      module('ndc');

      inject(function ($rootScope, _$compile_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
      });

    });

    it('should have the component class', function () {
      element = angular.element('<current-user-sidebar-item-component></current-user-sidebar-item-component>');
      element = $compile(element)(scope);
      scope.$digest();
      expect(element).toHaveClass('current-user-sidebar-item-component');
    });

  });

  describe('Controller: currentUserSidebarItemComponentCtrl', function () {

    var Ctrl, scope, element;

    beforeEach(function () {

      module('ndc');

      inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        element = angular.element('<current-user-sidebar-item-component></current-user-sidebar-item-component>');
        Ctrl = $controller('currentUserSidebarItemComponentCtrl', {
          $scope: scope,
          $element: element
        });
      });
    });

  });

});