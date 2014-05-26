'use strict';

describe('Directive: scrollLock', function () {

  var element, scope, $compile, $window;

  beforeEach(function () {

    $window = {
      pageYOffset: 500
    };

    module('ndc', function ($provide) {
      $provide.value('$window', $window);
    });

    inject(function ($rootScope, _$compile_) {
      scope = $rootScope.$new();
      $compile = _$compile_;
    });

  });

});
