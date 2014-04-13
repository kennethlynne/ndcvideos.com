'use strict';

describe('Component: panelListComponent', function () {

  describe('Directive: panelListComponent', function () {
    var element, scope, $compile;

    beforeEach(function () {

      module('ndc');

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

  });

  describe('Controller: panelListComponentCtrl', function () {

    var Ctrl, scope, element;

    beforeEach(function () {

      module('app');

      inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        element = angular.element('<panel-list-component></panel-list-component>');
        Ctrl = $controller('panelListComponentCtrl', {
          $scope: scope,
          $element: element
        });
      });
    });

  });

});