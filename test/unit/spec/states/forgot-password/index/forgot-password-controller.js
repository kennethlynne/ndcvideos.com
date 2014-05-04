'use strict';

describe('Controller(/forgot-password): ForgotpasswordCtrl', function () {

  var ForgotpasswordCtrl, scope;

  beforeEach(function () {

    module('ndc');

    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      ForgotpasswordCtrl = $controller('ForgotpasswordCtrl', {
        $scope: scope
      });
    });
  });

  it('should attach init data to scope', function () {
    expect(scope.foo).toEqual('bar');
  });
});