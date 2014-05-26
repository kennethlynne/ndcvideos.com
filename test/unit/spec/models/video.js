'use strict';

describe('Model: VideoModel', function () {

  var VideoModel, $httpBackend, $rootScope, APIBaseUrl, VideoRepository, collectionUrl = 'videos';

  beforeEach(function () {

    VideoRepository = jasmine.createSpy('VideoRepository');
    VideoRepository.attach = jasmine.createSpy('VideoRepository.attach');

    module('ndc', function ($provide) {
      $provide.value('VideoRepository', VideoRepository);
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
      $httpBackend.expectPUT(APIBaseUrl + collectionUrl + '/5', {title: 'New title', id: 5, upload_date: '0000-01-01T00:00:00.000Z', createdAt: '0000-01-01T00:00:00.000Z', updatedAt: '0000-01-01T00:00:00.000Z'}).respond(200, {id: 5, title: 'New title from server'});
      var model = new VideoModel({title: 'New title', id: 5, upload_date: '0', createdAt: '0', updatedAt: '0'});

      var promise = model.$save();
      $httpBackend.flush();

      expect(model.title).toBe('New title from server');
      expect(typeof promise.then).toBe('function');
    });

    it('should POST its data on $save if does not have an ID (new)', function () {
      $httpBackend.expectPOST(APIBaseUrl + collectionUrl, {title: 'New title', upload_date: '0000-01-01T00:00:00.000Z', createdAt: '0000-01-01T00:00:00.000Z', updatedAt: '0000-01-01T00:00:00.000Z'}).respond(200, {id: 5, title: 'New title from server'});
      var model = new VideoModel({title: 'New title', upload_date: '0', createdAt: '0', updatedAt: '0'});

      var promise = model.$save();
      $httpBackend.flush();

      expect(model.title).toBe('New title from server');
      expect(typeof promise.then).toBe('function');
    });

    it('should attach itself to the Repository on save', function () {
      $httpBackend.expectPUT(APIBaseUrl + collectionUrl + '/5', {title: 'New title', id: 5, upload_date: '0000-01-01T00:00:00.000Z', createdAt: '0000-01-01T00:00:00.000Z', updatedAt: '0000-01-01T00:00:00.000Z'}).respond(200, {id: 5, title: 'New title from server'});
      var model = new VideoModel({title: 'New title', id: 5,  upload_date: '0', createdAt: '0', updatedAt: '0'});
      expect(VideoRepository.attach).not.toHaveBeenCalled();
      var promise = model.$save();
      $httpBackend.flush();
      expect(VideoRepository.attach).toHaveBeenCalledWith(model);
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

  describe('$isDirty', function () {
    it('should return false if object is not changed since last save or delete ', function () {
      var model = new VideoModel({id: 1});
      expect(model.$isDirty).toBeFalsy();
    });

    it('should not be dirty initially', function () {
      var model = new VideoModel({id: 5});
      expect(model.$isDirty).toBeFalsy();
      $rootScope.$digest();
      expect(model.$isDirty).toBeFalsy();
    });

    it('should be dirty on change', function () {
      var model = new VideoModel({id: 5});
      $rootScope.$digest();
      model.thing = 'Data';
      $rootScope.$digest();
      expect(model.$isDirty).toBeTruthy();
    });

    it('should not be dirty after save', function () {
      var model = new VideoModel({id: 5});
      $rootScope.$digest();
      model.thing = 'Data';

      $httpBackend.expectPUT(APIBaseUrl + collectionUrl + '/5', {thing: 'Data', id: 5}).respond(200, {id: 5, thing: 'Data'});
      model.$save();

      $httpBackend.flush();
      expect(model.$isDirty).toBeFalsy();
    });
  });

  describe('$onChange', function () {
    it('should call all registered callbacks on change', function () {
      var cb = jasmine.createSpy('callback1');

      var model = new VideoModel({id: 5});
      model.$onChange(cb);
      $rootScope.$digest();
      expect(cb).not.toHaveBeenCalled();

      model.thing = 'Data';
      $rootScope.$digest();
      expect(cb).toHaveBeenCalled();
    });
  });
});
