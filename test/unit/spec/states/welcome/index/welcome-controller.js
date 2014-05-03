'use strict';

describe('Controller(/welcome): WelcomeCtrl', function () {

  var WelcomeCtrl, scope;

  beforeEach(function () {

    module('ndc');

    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      WelcomeCtrl = $controller('WelcomeCtrl', {
        $scope: scope,
        userToBeVerified: 'USER'
      });
    });
  });

  it('should attach init data to scope', function () {
    expect(scope.user).toEqual('USER');
  });
});