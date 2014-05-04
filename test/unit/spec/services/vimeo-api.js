'use strict';

describe('Service: vimeoAPI', function () {

  var vimeoAPI, $httpBackend, APIBaseUrl, VideoModel;

  beforeEach(function () {

    module('ndc');

    inject(function (_vimeoAPI_, _$httpBackend_, _APIBaseUrl_, _VideoModel_) {
      vimeoAPI = _vimeoAPI_;
      $httpBackend = _$httpBackend_;
      APIBaseUrl = _APIBaseUrl_;
      VideoModel = _VideoModel_;
    });

  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  it('should return a list of videos', function () {
    $httpBackend.expectGET(APIBaseUrl + 'imports?provider=vimeo').respond(200, [
      {id: 5, name: '13'},
      {id: 6, name: '37'}
    ]);

    var result = null;
    vimeoAPI.getVideos().then(function (response) {
      result = response;
    });

    $httpBackend.flush();

    expect(result.length).toBe(2);
    expect(result[0].name).toBe('13');
    expect(result[0] instanceof VideoModel).toBeTruthy();
  });

  it('should a video with id 5 and delete the ID property', function () {
    $httpBackend.expectGET(APIBaseUrl + 'imports/5?provider=vimeo').respond(200, {id: 5, name: '13'});

    var result = null;
    vimeoAPI.getVideoById(5).then(function (response) {
      console.log(response);

      result = response;
    });

    $httpBackend.flush();

    expect(result.name).toBe('13');
    expect(typeof result.id).toBe('undefined');
    expect(result instanceof VideoModel).toBeTruthy();
  });


});