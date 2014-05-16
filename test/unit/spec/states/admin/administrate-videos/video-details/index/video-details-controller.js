'use strict';

describe('Controller(/admin/administrate-videos/video-details): VideodetailsCtrl', function () {

  var VideodetailsCtrl, scope;

  beforeEach(function () {

    module('ndc');

    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      VideodetailsCtrl = $controller('VideodetailsCtrl', {
        $scope: scope
      });
    });
  });

  it('should initialize', function () {
  });
});