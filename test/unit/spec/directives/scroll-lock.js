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

'use strict';

describe('Service: scrollLock', function () {

  var scrollLock, $rootScope;

  beforeEach(function () {

    module('ndc');

    inject(function (_scrollLock_, _$rootScope_) {
      scrollLock = _scrollLock_;
      $rootScope = _$rootScope_;
    });

  });

});