'use strict';

describe('Controller(/admin/administrate-videos/edit): EditCtrl', function () {

  var EditCtrl, scope;

  beforeEach(function () {

    module('ndc');

    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      EditCtrl = $controller('EditCtrl', {
        $scope: scope
      });
    });
  });

});