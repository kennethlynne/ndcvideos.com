'use strict';

describe('Service: Array', function () {

  var array;

  beforeEach(function () {

    module('ndc');

    inject(function (_array_) {
      array = _array_;
    });

  });


  it('should add to an array', function () {
    var arrayRef = [3,2,1];
    array(arrayRef).add([1,2,3]);
    expect(arrayRef).toEqual([3,2,1,1,2,3]);
  });

  it('should set without loosing reference', function() {
    var arrayRef = [1,2,3,4,5];
    array(arrayRef).set([1,2,3]);
    expect(arrayRef).toEqual([1,2,3]);
  });

});