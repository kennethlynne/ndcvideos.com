'use strict';

describe('Service: Select2', function () {

  var Select2;

  beforeEach(function () {

    module('ndc');

    inject(function (_Select2_) {
      Select2 = _Select2_;
    });

  });


  it('should do something', function () {
    expect(!!Select2).toBe(true);
  });

});