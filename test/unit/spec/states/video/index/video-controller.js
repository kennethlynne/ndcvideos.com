'use strict';

describe('Controller(/video): VideoCtrl', function () {

  var VideoCtrl, scope, $controller, VideoRepository, defered, $q, promise, deferred, $rootScope, $stateParams = {};

  beforeEach(function () {
    module('ndc');
    inject(function (_$controller_, _$rootScope_, _$q_) {

      function getPromise() {
        return promise;
      }

      VideoRepository = {
        where: jasmine.createSpy('VideoRepository.where').and.callFake(getPromise),
        getAll: jasmine.createSpy('VideoRepository.getAll').and.callFake(getPromise)
      };

      scope = _$rootScope_.$new();
      $q = _$q_;
      deferred = $q.defer();
      promise = deferred.promise;
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      InitializeController();
    });
  });


  function InitializeController() {
    VideoCtrl = $controller('VideoCtrl', {
      $scope: scope,
      VideoRepository: VideoRepository,
      $stateParams: $stateParams
    });
  }

  it('should attach a video to scope', function () {
    deferred.resolve([1, 2, 3, 4]);
    $rootScope.$digest();
    expect(scope.videos.length).toBe(4);
  });

  xit('should attach videos to scope based on tags', function () {
    $stateParams.tags = 'balle';
    InitializeController();

    deferred.resolve([1, 2, 3, 4]);
    $rootScope.$digest();
    expect(scope.videos.length).toBe(4);
  });
});