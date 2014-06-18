'use strict';

describe('Component: panelListComponent', function () {

  describe('Directive: panelListComponent', function () {
    var element, scope, $compile, profiles, hasAccess = false;

    beforeEach(function () {

      profiles = {
        guest: {
          hasRoles: jasmine.createSpy('roles.guest.hasRoles').and.callFake(function () {
              return hasAccess;
          })
        }
      };

      module('ndc', function ($provide) {
        $provide.value('profiles', profiles);
      });

      inject(function ($rootScope, _$compile_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
      });

    });

    it('should have the component class', function () {
      element = angular.element('<panel-list-component></panel-list-component>');
      element = $compile(element)(scope);
      scope.$digest();
      expect(element).toHaveClass('panel-list-component');
    });

    it('should list only the items the user has access to', function () {
      element = angular.element('<panel-list-component></panel-list-component>');
      element = $compile(element)(scope);
      scope.$digest();
      expect(element.find('li').size()).toBe(1);
    });

  });

});