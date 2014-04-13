'use strict';

describe('Component: panelListItemComponent', function () {

  describe('Directive: panelListItemComponent', function () {
    var element, scope, $compile;

    beforeEach(function () {

      module('ndc');

      inject(function ($rootScope, _$compile_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
      });

    });

    it('should have the component class', function () {
      element = angular.element('<panel-list-item-component item="item"></panel-list-item-component>');
      scope.item = {
        action: 'index'
      };

      element = $compile(element)(scope);
      scope.$digest();
      expect(element).toHaveClass('panel-list-item-component');
    });

  });

  describe('Controller: panelListItemComponentCtrl', function () {

    var Ctrl, scope;

    beforeEach(function () {

      module('app');

      inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        Ctrl = $controller('panelListItemComponentCtrl', {
          $scope: scope
        });
      });
    });

  });

});