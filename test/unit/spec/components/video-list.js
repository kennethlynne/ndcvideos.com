'use strict';

describe('Component: videoListComponent', function () {

  describe('Directive: videoListComponent', function () {
    var element, scope, $compile;

    beforeEach(function () {

      module('ndc');

      inject(function ($rootScope, _$compile_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
      });

    });

    it('should have the component class', function () {
      element = angular.element('<video-list-component></video-list-component>');
      element = $compile(element)(scope);
      scope.$digest();
      expect(element).toHaveClass('video-list-component');
    });

  });

  describe('Controller: videoListComponentCtrl', function () {

    var Ctrl, scope, element;

    beforeEach(function () {

      module('ndc');

      inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        element = angular.element('<video-list-component></video-list-component>');
        Ctrl = $controller('videoListComponentCtrl', {
          $scope: scope,
          $element: element
        });
      });
    });

  });

});