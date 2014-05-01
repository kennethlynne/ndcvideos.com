'use strict';

describe('Component: logoutSidebarItemComponent', function () {

  describe('Directive: logoutSidebarItemComponent', function () {
    var element, scope, $compile, authentication;

    beforeEach(function () {

      module('ndc', function ($provide) {
        $provide.decorator('authentication', function ($delegate) {
          $delegate.logout = jasmine.createSpy('authentication.logout');
          return $delegate;
        });
      });

      inject(function ($rootScope, _$compile_, _authentication_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
        authentication = _authentication_;
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
      expect(authentication.logout).toHaveBeenCalled();
    });
  });

  describe('Controller: logoutSidebarItemComponentCtrl', function () {

    var Ctrl, scope, authentication;

    beforeEach(function () {

      authentication = {
        logout: jasmine.createSpy('authentication.logout')
      };

      module('ndc');

      inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        Ctrl = $controller('logoutSidebarItemComponentCtrl', {
          $scope: scope,
          authentication: authentication
        });
      });
    });

    it('should log the user out', function () {
      scope.logout();
      expect(authentication.logout).toHaveBeenCalled();
    });
  });

});