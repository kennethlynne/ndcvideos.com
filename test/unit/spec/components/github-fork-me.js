'use strict';

describe('Component: githubForkMeComponent', function () {

  describe('Directive: githubForkMeComponent', function () {
    var element, scope, $compile;

    beforeEach(function () {

      module('ndc');

      inject(function ($rootScope, _$compile_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
      });

    });

    it('should have the component class', function () {
      element = angular.element('<github-fork-me-component></github-fork-me-component>');
      element = $compile(element)(scope);
      scope.$digest();
      expect(element).toHaveClass('github-fork-me-component');
    });

  });

});