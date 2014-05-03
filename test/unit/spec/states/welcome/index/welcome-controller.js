'use strict';

describe('Controller(/welcome): WelcomeCtrl', function () {

  var WelcomeCtrl, $rootScope, scope, deferred, user, authentication;

  beforeEach(function () {

    function getPromise() {
      return deferred.promise;
    }

    user = {
      $verify: getPromise
    };

    authentication = {
      login: jasmine.createSpy('authentication.login').and.callFake(getPromise),
      getToken: function () {
        return 'TOKEN';
      }
    };

    module('ndc', function ($provide) {
      $provide.value('authentication', authentication);
    });

    inject(function ($controller, _$rootScope_, $q) {
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
      deferred = $q.defer();
      WelcomeCtrl = $controller('WelcomeCtrl', {
        $scope: scope,
        userToBeVerified: user
      });
    });

  });

  it('should log a user in after verification', function () {
    scope.verify();
    deferred.resolve();
    scope.$digest();
    expect(authentication.login).toHaveBeenCalled();
  });

});