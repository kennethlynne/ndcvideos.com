'use strict';

describe('Controller(/admin/import-videos/import): ImportVideoModalCtrl', function () {

  var ImportVideoModalCtrl, scope;

  beforeEach(function () {

    module('ndc');

    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      ImportVideoModalCtrl = $controller('ImportVideoModalCtrl', {
        $scope: scope
      });
    });
  });

});