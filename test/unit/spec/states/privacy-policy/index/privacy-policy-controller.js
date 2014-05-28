'use strict';

describe('Controller(/privacy-policy): PrivacypolicyCtrl', function () {

  var PrivacypolicyCtrl, scope;

  beforeEach(function () {

    module('ndc');

    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      PrivacypolicyCtrl = $controller('PrivacypolicyCtrl', {
        $scope: scope
      });
    });
  });

  it('should attach init data to scope', function () {
    expect(scope.foo).toEqual('bar');
  });
});