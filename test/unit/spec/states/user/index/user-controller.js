'use strict';

describe('Controller(/user): UserCtrl', function () {

  var UserCtrl, scope, authentication;

  beforeEach(function () {

    authentication = {
      logout: jasmine.createSpy('authentication.logout')
    };

    module('ndc');

    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      UserCtrl = $controller('UserCtrl', {
        $scope: scope,
        authentication: authentication
      });
    });
  });

  it('should log the user out', function () {
    scope.logout();
    expect(authentication.logout).toHaveBeenCalled();
  });
});