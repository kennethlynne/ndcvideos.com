'use strict';

describe('Service: storage', function () {

  var storage, $cookies;

  beforeEach(function () {

    module('ndc', function ($provide) {
    });

    inject(function (_storage_, _$cookies_) {
      storage = _storage_;
      $cookies = _$cookies_;
    });

  });

  it('should return token from localstorage', function () {
    storage.set('token', 'horse');

    var d = storage.get('token');

    expect(d).toBe('horse');
  });

  xit('should fall back to cookies', function () {
  });

  xit('should fall back to memory storage', function () {
  });
});
