'use strict';

describe('Controller(/video/video-details): VideodetailsCtrl', function () {

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

});