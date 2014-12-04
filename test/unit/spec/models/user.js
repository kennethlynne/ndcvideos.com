'use strict';

describe('Model: UserModel', function () {

  var UserModel, $httpBackend, $rootScope, APIBaseUrl, UserRepository, collectionUrl = 'users';

  beforeEach(function () {

    UserRepository = jasmine.createSpy('UserRepository');
    UserRepository.attach = jasmine.createSpy('UserRepository.attach');

    module('ndc', function ($provide) {
      $provide.value('UserRepository', UserRepository);
    });

    inject(function (_UserModel_, _$httpBackend_, _$rootScope_, _APIBaseUrl_) {
      UserModel = _UserModel_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
      APIBaseUrl = _APIBaseUrl_;
    });

  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have the url property set', function () {
    expect(UserModel.$settings.url).toBe(APIBaseUrl + collectionUrl);
  });

  describe('$save', function () {
    it('should PUT its data on $save when it has an ID (update existing)', function () {
      $httpBackend.expectPUT(APIBaseUrl + collectionUrl + '/5', {title: 'New title', id: 5}).respond(200, {id: 5, title: 'New title from server'});
      var model = new UserModel({title: 'New title', id: 5});

      var promise = model.$save();
      $httpBackend.flush();

      expect(model.title).toBe('New title from server');
      expect(typeof promise.then).toBe('function');
    });

    it('should POST its data on $save if does not have an ID (new)', function () {
      $httpBackend.expectPOST(APIBaseUrl + collectionUrl, {title: 'New title'}).respond(200, {id: 5, title: 'New title from server'});
      var model = new UserModel({title: 'New title'});

      var promise = model.$save();
      $httpBackend.flush();

      expect(model.title).toBe('New title from server');
      expect(typeof promise.then).toBe('function');
    });

    it('should attach itself to the Repository on save', function () {
      $httpBackend.expectPUT(APIBaseUrl + collectionUrl + '/5', {title: 'New title', id: 5}).respond(200, {id: 5, title: 'New title from server'});
      var model = new UserModel({title: 'New title', id: 5});
      expect(UserRepository.attach).not.toHaveBeenCalled();
      var promise = model.$save();
      $httpBackend.flush();
      expect(UserRepository.attach).toHaveBeenCalledWith(model);
    });
  });

  describe('$set', function () {
    it('should load instance and override with new data', function () {
      var model = new UserModel({title: 'New title', id: 5});

      model.$set({id: 1});

      expect(model.id).toBe(1);
      expect(model instanceof UserModel).toBeTruthy();
    });

    it('should remove properties missing in new object', function () {
      var model = new UserModel();

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

      var model = new UserModel();
      model.id = 5;

      var promise = model.$delete();
      $httpBackend.flush();

      expect(typeof promise.then).toBe('function');
    });
  });

  describe('$verify', function () {
    it('should delete on $delete', function () {
      $httpBackend.expectPOST(APIBaseUrl + collectionUrl + '/5/verify', {username: 'username',password: 'NEWPASSWORD', verificationToken: 'MOCKTOKEN'}).respond(200, {});

      var model = new UserModel();
      model.id = 5;
      model.verificationToken = 'MOCKTOKEN';

      var promise = model.$verify('username', 'MOCKTOKEN', 'NEWPASSWORD');
      $httpBackend.flush();

      expect(typeof promise.then).toBe('function');
    });
  });

});
