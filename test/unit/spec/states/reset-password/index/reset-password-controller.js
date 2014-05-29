'use strict';

describe('Controller(/reset-password): ResetpasswordCtrl', function () {

  var ResetpasswordCtrl, scope;

  beforeEach(function () {

    module('ndc');

    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      ResetpasswordCtrl = $controller('ResetpasswordCtrl', {
        $scope: scope
      });
    });
  });

});