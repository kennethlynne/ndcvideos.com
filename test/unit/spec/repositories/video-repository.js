describe('Model Repository: VideoRepository', function () {

  var VideoRepository, $httpBackend, VideoModel, $rootScope;

  beforeEach(function () {

    module('ndc');

    inject(function (_VideoRepository_, _$httpBackend_, _VideoModel_, _$rootScope_) {
      VideoRepository = _VideoRepository_;
      $httpBackend = _$httpBackend_;
      VideoModel = _VideoModel_;
      $rootScope = _$rootScope_;
    });

  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('getById', function () {
    it('should return models by id', function () {
      $httpBackend.expectGET(VideoModel.$settings.url + '/5').respond(200, {id: 5, title: 'Video title', upload_date: '2014-05-21T15:02:01.881Z', createdAt: '2014-05-21T15:02:01.881Z', updatedAt: '2014-05-21T15:02:01.881Z'});

      var promise = VideoRepository.getById(5);

      var response;
      promise.then(function (r) {
        response = r;
      });

      $httpBackend.flush();

      expect(response instanceof VideoModel).toBe(true);
      expect(response.id).toEqual(5);
      expect(response.title).toEqual('Video title');
    });

    it('should not do subsequent calls if model already exits in pool', function () {
      $httpBackend.expectGET(VideoModel.$settings.url + '/5').respond(200, {id: 5, title: 'Video title', upload_date: '2014-05-21T15:02:01.881Z', createdAt: '2014-05-21T15:02:01.881Z', updatedAt: '2014-05-21T15:02:01.881Z'});
      VideoRepository.getById(5);
      $httpBackend.flush();

      var promise = VideoRepository.getById(5);

      var response;
      promise.then(function (r) {
        response = r;
      });

      $rootScope.$digest();

      expect(response instanceof VideoModel).toBe(true);
      expect(response.id).toEqual(5);
      expect(response.title).toEqual('Video title');
    });

    it('should handle rejects', function () {
      $httpBackend.expectGET(VideoModel.$settings.url + '/5').respond(404, 'No such thang!');

      var promise = VideoRepository.getById(5),
        response,
        success = jasmine.createSpy('success'),
        error = jasmine.createSpy('error');

      promise.then(success).catch(error);

      $httpBackend.flush();

      expect(success).not.toHaveBeenCalled();
      expect(error).toHaveBeenCalled();
    });
  });

  describe('getAll', function () {
    it('should return models by id', function () {
      $httpBackend.expectGET(VideoModel.$settings.url).respond(200, [
        {id: 5, title: 'Video title'},
        {id: 6, title: 'Video title'}
      ]);

      var promise = VideoRepository.getAll();

      var Video5, Video6;
      promise.then(function (r) {
        Video5 = r[0];
        Video6 = r[1];
      });

      $httpBackend.flush();

      expect(Video5 instanceof VideoModel).toBe(true);
      expect(Video5.id).toEqual(5);
      expect(Video5.title).toEqual('Video title');

      expect(Video6 instanceof VideoModel).toBe(true);
      expect(Video6.id).toEqual(6);
      expect(Video6.title).toEqual('Video title');
    });

    it('should handle rejects', function () {
      $httpBackend.expectGET(VideoModel.$settings.url).respond(404, 'No such thang!');

      var promise = VideoRepository.getAll(5),
        success = jasmine.createSpy('success'),
        error = jasmine.createSpy('error');

      promise.then(success).catch(error);

      $httpBackend.flush();

      expect(success).not.toHaveBeenCalled();
      expect(error).toHaveBeenCalled();
    });
  });

  describe('attach', function () {

    var VideoModel;

    beforeEach(function () {
      inject(function (_VideoModel_) {
        VideoModel = _VideoModel_;
      });
    });

    it('should throw if trying to attach a model that is not of valid type', function () {
      function wrapper() {
        VideoRepository.attach({fails: true});
      }

      expect(wrapper).toThrow();
    });

    it('should return the attached model on subsequent requests', function () {

      VideoRepository.attach(new VideoModel({id: 5, title: 'Video title'}));

      var Video;

      VideoRepository.getById(5).then(function (response) {
        Video = response;
      });

      $rootScope.$digest();

      expect(Video instanceof VideoModel).toBe(true);
      expect(Video.id).toEqual(5);
      expect(Video.title).toEqual('Video title');
    });
  });

  describe('create', function () {
    it('should return a newed up instance of the Video Model', function () {
      var Video = VideoRepository.create({title: 'New title'});
      expect(Video instanceof VideoModel).toBe(true);
      expect(Video.title).toEqual('New title');
    });
  });

  describe('cache', function () {
    it('should return a reference to the pool', function () {
      var newVideo = {id: 19, title: 'Yeah!'};
      VideoRepository.cache[19] = newVideo;

      var Video;
      VideoRepository.getById(19).then(function (response) {
        Video = response;
      });
      $rootScope.$digest();

      expect(Video).toBe(newVideo);
    });
  });

  describe('saveChanges', function () {
    it('should save all changes in current Repository to the server');
  });
});