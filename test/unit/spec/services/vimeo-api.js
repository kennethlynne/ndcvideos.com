'use strict';

describe('Service: vimeoAPI', function () {

  var vimeoAPI, $httpBackend, Config, VideoModel;

  beforeEach(function () {

    module('ndc');

    inject(function (_vimeoAPI_, _$httpBackend_, _Config_, _VideoModel_) {
      vimeoAPI = _vimeoAPI_;
      $httpBackend = _$httpBackend_;
      Config = _Config_;
      VideoModel = _VideoModel_;
    });

  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  it('should return a list of videos', function () {
    $httpBackend.expectGET(Config.vimeoAPIUrl + 'videos.json').respond(200, [
      {id: 5, name: 'balle'},
      {id: 6, name: 'bruno'}
    ]);

    vimeoAPI.getVideos().then(function (response) {
      var videos = response;

      expect(videos.length).toBe(2);
      expect(videos[0].name).toBe('balle');
      expect(videos[0] instanceof VideoModel).toBeTruthy();

    })
    $httpBackend.flush();

  });

});