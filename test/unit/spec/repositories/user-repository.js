describe('Model Repository: UserRepository', function () {

  var UserRepository, $httpBackend, Model, $rootScope, BaseRepository;

  beforeEach(function () {

    Model = function (p) {
      this.id = p.id;
    };

    Model.$settings = {
      url: 'URL'
    };

    module('ndc', function ($provide) {
      $provide.value('UserModel', Model);
    });

    inject(function (_UserRepository_, _$httpBackend_, _$rootScope_, $injector) {
      UserRepository = _UserRepository_;
      $httpBackend = _$httpBackend_;
      BaseRepository = $injector.get('BaseRepository');
      $rootScope = _$rootScope_;
    });

  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be an instance of BaseRepository', function () {
    expect(UserRepository instanceof BaseRepository).toBeTruthy();
  });

  describe('getById', function () {
    it('should return models by id', function () {
      $httpBackend.expectGET(Model.$settings.url + '/5').respond(200, {id: 5});

      var promise = UserRepository.getById(5);

      var response;
      promise.then(function (r) {
        response = r;
      });

      $httpBackend.flush();

      expect(response instanceof Model).toBeTruthy();
      expect(response.id).toEqual(5);
    });

    it('should not do subsequent calls if model already exits in pool', function () {
      $httpBackend.expectGET(Model.$settings.url + '/5').respond(200, {id: 5});
      UserRepository.getById(5);
      $httpBackend.flush();

      var promise = UserRepository.getById(5);

      var response;
      promise.then(function (r) {
        response = r;
      });

      $rootScope.$digest();

      expect(response instanceof Model).toBeTruthy();
      expect(response.id).toEqual(5);
    });

    it('should handle rejects', function () {
      $httpBackend.expectGET(Model.$settings.url + '/5').respond(404, 'No such thang!');

      var promise = UserRepository.getById(5),
        response,
        success = jasmine.createSpy('success'),
        error = jasmine.createSpy('error');

      promise.then(success).catch(error);

      $httpBackend.flush();

      expect(success).not.toHaveBeenCalled();
      expect(error).toHaveBeenCalled();
    });
  });

  describe('getByToken', function () {
    it('should return models by token', function () {
      $httpBackend.expectGET(Model.$settings.url + '?token=MOCKTOKEN').respond(200, {id: 5});

      var promise = UserRepository.getByToken('MOCKTOKEN');

      var response;
      promise.then(function (r) {
        response = r;
      });

      $httpBackend.flush();

      expect(response instanceof Model).toBeTruthy();
      expect(response.id).toEqual(5);
    });

    it('should handle rejects', function () {
      $httpBackend.expectGET(Model.$settings.url + '?token=MOCKTOKEN').respond(404, 'No such thang!');

      var promise = UserRepository.getByToken('MOCKTOKEN'),
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
      $httpBackend.expectGET(Model.$settings.url).respond(200, [
        {id: 5},
        {id: 6}
      ]);

      var promise = UserRepository.getAll();

      var User5, User6;
      promise.then(function (r) {
        User5 = r[0];
        User6 = r[1];
      });

      $httpBackend.flush();

      expect(User5 instanceof Model).toBeTruthy();
      expect(User5.id).toEqual(5);

      expect(User6 instanceof Model).toBeTruthy();
      expect(User6.id).toEqual(6);
    });

    it('should handle rejects', function () {
      $httpBackend.expectGET(Model.$settings.url).respond(404, 'No such thang!');

      var promise = UserRepository.getAll(5),
        success = jasmine.createSpy('success'),
        error = jasmine.createSpy('error');

      promise.then(success).catch(error);

      $httpBackend.flush();

      expect(success).not.toHaveBeenCalled();
      expect(error).toHaveBeenCalled();
    });
  });

  describe('attach', function () {

    it('should throw if trying to attach a model that is not of valid type', function () {
      function wrapper() {
        UserRepository.attach({fails: true});
      }

      expect(wrapper).toThrow();
    });

    it('should return the attached model on subsequent requests', function () {

      UserRepository.attach(new Model({id: 5}));

      var User;

      UserRepository.getById(5).then(function (response) {
        User = response;
      });

      $rootScope.$digest();

      expect(User instanceof Model).toBeTruthy();
      expect(User.id).toEqual(5);
    });
  });

  describe('create', function () {
    it('should return a newed up instance of the User Model', function () {
      var User = UserRepository.create({title: 'New title'});
      expect(User instanceof Model).toBeTruthy();
    });
  });

  describe('cache', function () {
    it('should return a reference to the pool', function () {
      var newUser = {id: 19};
      UserRepository.cache[19] = newUser;

      var User;
      UserRepository.getById(19).then(function (response) {
        User = response;
      });
      $rootScope.$digest();

      expect(User).toBe(newUser);
    });
  });

  describe('saveChanges', function () {
    it('should save all changes in current Repository to the server');
  });
});