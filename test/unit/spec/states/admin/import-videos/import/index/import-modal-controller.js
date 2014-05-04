'use strict';

describe('Controller(/admin/import-videos/import): ImportVideoModalCtrl', function () {

  var ImportVideoModalCtrl, scope, vimeoAPI, deferred, promise, $rootScope, $state = {params:{id:1}};

  beforeEach(function () {

    function getPromise() {
      return promise;
    }

    vimeoAPI = {
      getVideoById: jasmine.createSpy('vimeoAPI.getVideoById').and.callFake(getPromise)
    };

    module('ndc');

    inject(function ($controller, _$rootScope_, $q) {
      deferred = $q.defer();
      promise = deferred.promise;
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();

      ImportVideoModalCtrl = $controller('ImportVideoModalCtrl', {
        $scope: scope,
        vimeoAPI: vimeoAPI
      });
    });
  });

  it('should get a video from vimeo', function () {
    var video = {id:1, name:'ragnar'};
    deferred.resolve(video);
    $rootScope.$digest();
    expect(scope.vimeoVideo).toBe(video);
  });


});