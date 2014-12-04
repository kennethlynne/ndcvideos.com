'use strict';

describe('Model: VideoModel', function () {

  var VideoModel, $httpBackend, $rootScope, APIBaseUrl, collectionUrl = 'videos';

  beforeEach(function () {

    module('ndc', function ($provide) {
      $provide.service('timeFilter', function () {
        return function () {
          return 'timeFilter stub';
        }
      });
    });

    inject(function (_VideoModel_, _$httpBackend_, _$rootScope_, _APIBaseUrl_) {
      VideoModel = _VideoModel_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
      APIBaseUrl = _APIBaseUrl_;
    });

  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have the $urlBase property set', function () {
    expect(VideoModel.$settings.url).toBe(APIBaseUrl + collectionUrl);
  });

  it('should expose a computed duration value', function () {
    var model = new VideoModel({id: 5, duration: 60});
    expect(model.$durationInHHMMSS).toBe('timeFilter stub');
  });

  describe('$save', function () {
    it('should PUT its data on $save when it has an ID (update existing)', function () {
      $httpBackend.expectPUT(APIBaseUrl + collectionUrl + '/5', {title: 'New title', id: 5, upload_date: '2014-06-01T00:00:00.000Z', createdAt: '2014-06-01T00:00:00.000Z', updatedAt: '2014-06-01T00:00:00.000Z'}).respond(200, {id: 5, title: 'New title from server'});
      var model = new VideoModel({title: 'New title', id: 5, upload_date: '2014-06-01T00:00:00.000Z', createdAt: '2014-06-01T00:00:00.000Z', updatedAt: '2014-06-01T00:00:00.000Z'});

      var promise = model.$save();
      $httpBackend.flush();

      expect(model.title).toBe('New title from server');
      expect(typeof promise.then).toBe('function');
    });

    it('should POST its data on $save if does not have an ID (new)', function () {
      $httpBackend.expectPOST(APIBaseUrl + collectionUrl, {title: 'New title', upload_date: '2014-06-01T00:00:00.000Z', createdAt: '2014-06-01T00:00:00.000Z', updatedAt: '2014-06-01T00:00:00.000Z'}).respond(200, {id: 5, title: 'New title from server'});
      var model = new VideoModel({title: 'New title', upload_date: '2014-06-01T00:00:00.000Z', createdAt: '2014-06-01T00:00:00.000Z', updatedAt: '2014-06-01T00:00:00.000Z'});

      var promise = model.$save();
      $httpBackend.flush();

      expect(model.title).toBe('New title from server');
      expect(typeof promise.then).toBe('function');
    });

  });

  describe('$set', function () {
    it('should load instance and override with new data', function () {
      var model = new VideoModel({title: 'New title', id: 5});

      model.$set({id: 1});

      expect(model.id).toBe(1);
      expect(model instanceof VideoModel).toBeTruthy();
    });

    it('should remove properties missing in new object', function () {
      var model = new VideoModel();

      model.title = 'New title';
      model.id = 5;

      model.$set({id: 1});

      expect(model.id).toBe(1);
      expect(model.title).toBeUndefined();
    });
  });

  describe('$delete', function () {
    it('should delete on $delete', function () {
      $httpBackend.expectDELETE(APIBaseUrl + collectionUrl + '/5').respond(200, {});

      var model = new VideoModel();
      model.id = 5;

      var promise = model.$delete();
      $httpBackend.flush();

      expect(typeof promise.then).toBe('function');
    });
  });

});
