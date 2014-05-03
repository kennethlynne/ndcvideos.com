'use strict';

describe('Controller(/admin/import-videos): AdminImportVideosOverviewCtrl', function () {

  var AdminImportVideosOverviewCtrl, $rootScope, scope, vimeoAPI, deferred, promise;

  beforeEach(function () {

    function getPromise() {
      return promise;
    }

    vimeoAPI = {
      getVideos: jasmine.createSpy('vimeoAPI.getVideos').and.callFake(getPromise)
    };

    module('ndc');

    inject(function ($controller, _$rootScope_, $q) {
      deferred = $q.defer();
      promise = deferred.promise;
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();

      AdminImportVideosOverviewCtrl = $controller('AdminImportVideosOverviewCtrl', {
        $scope: scope,
        vimeoAPI: vimeoAPI
      });
    });
  });

  it('should list videos from vimeo', function () {
    deferred.resolve([1, 2, 3, 4, 5]);
    $rootScope.$digest();
    expect(scope.vimeoVideos.length).toBe(5);
  });

});