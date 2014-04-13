'use strict';

describe('Component: rightPanelComponent', function () {

  describe('Directive: rightPanelComponent', function () {
    var element, scope, $compile;

    beforeEach(function () {

      module('ndc');

      inject(function ($rootScope, _$compile_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
      });

    });

    it('should have the component class', function () {
      element = angular.element('<right-panel-component></right-panel-component>');
      element = $compile(element)(scope);
      scope.$digest();
      expect(element).toHaveClass('right-panel-component');
    });

  });

  describe('Controller: rightPanelComponentCtrl', function () {

    var Ctrl, scope;

    beforeEach(function () {

      module('ndc');

      inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        Ctrl = $controller('rightPanelComponentCtrl', {
          $scope: scope
        });
      });
    });

  });

});