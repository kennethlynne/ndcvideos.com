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

  it('should add a class to body', function () {
    scrollLock.enable();
    expect($rootScope.$$scrollLockEnabled).toBeTruthy();
  });


  it('should remove a class from body', function () {
    scrollLock.enable();
    scrollLock.disable();
    expect($rootScope.$$scrollLockEnabled).toBeFalsy();
  });
});