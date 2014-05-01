'use strict';

describe('Controller(/agenda): AgendaCtrl', function () {

  var AgendaCtrl, scope;

  beforeEach(function () {

    module('ndc');

    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      AgendaCtrl = $controller('AgendaCtrl', {
        $scope: scope
      });
    });
  });

  it('should initialize', function () {
      //Only testing that the controller actually can load here, should be better tested
  });
});