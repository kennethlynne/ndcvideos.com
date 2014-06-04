'use strict';

describe('Component: tagListComponent', function () {

  describe('Directive: tagListComponent', function () {
    var element, scope, $compile, tags = [{text:'helllooooo'}];

    beforeEach(function () {

      module('ndc');

      inject(function ($rootScope, _$compile_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
      });

    });

    it('should have the component class', function () {
      scope.tags = tags;
      element = angular.element('<tag-list-component></tag-list-component>');
      element = $compile(element)(scope);
      scope.$digest();
      expect(element).toHaveClass('tag-list-component');
    });

    it('should render text', function () {
      scope.tags = tags;
      element = angular.element('<tag-list-component tags="tags"></tag-list-component>');
      element = $compile(element)(scope);
      scope.$digest();
      expect(element.find('.tags').html()).toContain('helllooooo');
    });

  });

  describe('Controller: tagListComponentCtrl', function () {

    var Ctrl, scope, element;

    beforeEach(function () {

      module('ndc');

      inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        element = angular.element('<tag-list-component></tag-list-component>');
        Ctrl = $controller('tagListComponentCtrl', {
          $scope: scope,
          $element: element
        });
      });
    });

    it('should render a message', function () {
      expect(scope.text).toContain('tagList');
    });
  });

});