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