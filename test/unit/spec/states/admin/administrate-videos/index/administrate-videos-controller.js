'use strict';

describe('Controller(/admin/administrate-videos): AdministratevideosCtrl', function () {

  var Videos, scope, VideoRepository, deferred, promise, $rootScope;

  beforeEach(function () {

    function getPromise() {
      return promise;
    }

    VideoRepository = {
      getAll: jasmine.createSpy('VideoRepository.getAll').and.callFake(getPromise)
    };

    module('ndc');

    inject(function ($controller, _$rootScope_, $q) {
      deferred = $q.defer();
      promise = deferred.promise;
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
      Videos = $controller('AdministratevideosCtrl', {
        $scope: scope,
        VideoRepository: VideoRepository
      });
    });
  });

  it('should list existing videos', function () {
    deferred.resolve([1, 2, 3, 4, 5]);
    $rootScope.$digest();
    expect(scope.videos.length).toBe(5);
  });

});