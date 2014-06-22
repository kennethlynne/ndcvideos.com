'use strict';

describe('Component: loginSidebarItemComponent', function () {

  describe('Directive: loginSidebarItemComponent', function () {
    var element, scope, $compile, $state;

    beforeEach(function () {

      module('ndc', function ($provide) {
        $provide.decorator('$state', function ($delegate) {
          $delegate.go = jasmine.createSpy('$state.logout');
          return $delegate;
        });
      });

      inject(function ($rootScope, _$compile_, _$state_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
        $state = _$state_;
      });

    });

    it('should have the component class', function () {
      element = angular.element('<logout-sidebar-item-component></logout-sidebar-item-component>');
      element = $compile(element)(scope);
      scope.$digest();
      expect(element).toHaveClass('logout-sidebar-item-component');
    });

    it('should log the user out', function () {
      element = angular.element('<logout-sidebar-item-component></logout-sidebar-item-component>');
      element = $compile(element)(scope);
      scope.$digest();
      element.click();
      expect($state.go).toHaveBeenCalled();
    });
  });

  describe('Controller: loginSidebarItemComponentCtrl', function () {

    var Ctrl, scope, $state;

    beforeEach(function () {

      $state = {
        go: jasmine.createSpy('$state.logout')
      };

      module('ndc');

      inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        Ctrl = $controller('loginSidebarItemComponentCtrl', {
          $scope: scope,
          $state: $state
        });
      });
    });

    it('should log the user out', function () {
      scope.login();
      expect($state.go).toHaveBeenCalled();
    });
  });

});