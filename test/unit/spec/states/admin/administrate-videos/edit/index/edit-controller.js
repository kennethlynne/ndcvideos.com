'use strict';

describe('Controller(/admin/administrate-videos/edit): EditVideoCtrl', function () {

  var EditCtrl, scope;

  beforeEach(function () {

    module('ndc');

    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      EditCtrl = $controller('EditVideoCtrl', {
        $scope: scope
      });
    });
  });
  
  it('should be tested!', function() {
      
  });

});