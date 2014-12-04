'use strict';

describe('Service: authentication', function () {

  var authentication, $httpBackend, $rootScope, APIBaseUrl, $http, loginSuccessfullResponse, loginFailedResponse, logIn, storage, CurrentUser, UserRepository, promise, deferred;

  beforeEach(function () {

    storage = {};

    function getPromise() {
      return promise;
    }

    UserRepository = {
      getByToken: jasmine.createSpy('UserRepository.getByToken').and.callFake(getPromise)
    };

    module('ndc', function ($provide) {
      $provide.value('storage', storage);
      $provide.value('UserRepository', UserRepository);
      $provide.decorator('CurrentUser', function ($delegate) {
        spyOn($delegate, 'unset').and.callThrough();
        return $delegate;
      });
    });

    logIn = function logIn() {
      $httpBackend.expectPOST(APIBaseUrl + 'authentication/login', {
        username: 'Ali',
        password: 'password123'
      }).respond(200, loginSuccessfullResponse);

      authentication.login('password', 'Ali', 'password123');
      $httpBackend.flush();
    };

    loginSuccessfullResponse = {
      "access_token": "take-on-me",
      "userName": "Ali",
      ".issued": "Mon, 14 Oct 2013 06:53:32 GMT",
      ".expires": "Mon, 28 Oct 2013 06:53:32 GMT",
      "user": {
        "id": 1,
        "userName": "Ali"
      }
    };

    loginFailedResponse = {
      message: 'Not authorized.'
    };

    inject(function (_authentication_, _$httpBackend_, _APIBaseUrl_, _$http_, _CurrentUser_, $q, _$rootScope_) {
      deferred = $q.defer();
      promise = deferred.promise;
      authentication = _authentication_;
      $httpBackend = _$httpBackend_;
      APIBaseUrl = _APIBaseUrl_;
      $http = _$http_;
      CurrentUser = _CurrentUser_;
      $rootScope = _$rootScope_;
    });

  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should return the current login state', function () {
    expect(authentication.isAuthenticated()).toBeFalsy();
  });

  it('should return undefined token when not logged in', function () {
    expect(authentication.getToken()).toBeUndefined();
  });

  it('should remember token', function () {
    logIn();
    expect(authentication.getToken()).toBe('take-on-me');
  });

  it('should not decorate requests not targeted at the API with token information', function () {
    logIn();
    $httpBackend.expectGET('external-api', {"Accept": "application/json, text/plain, */*"}).respond();
    $http.get('external-api');
    $httpBackend.flush();
  });

  it('should decorate all subsequent requests to the API with the token information', function () {
    logIn();
    $httpBackend.expectGET(APIBaseUrl + 'test', {
      "Accept": "application/json, text/plain, */*",
      "x-access-token": "take-on-me"
    }).respond();
    $http.get(APIBaseUrl + 'test');
    $httpBackend.flush();
  });

  it('should indicate that the user is logged in', function () {
    logIn();
    expect(authentication.isAuthenticated()).toBeTruthy();
  });

  it('should reset information on logout', function () {
    logIn();
    authentication.logout();

    expect(authentication.getToken()).toBeUndefined();
    expect(authentication.isAuthenticated()).toBeFalsy();

    $httpBackend.expectGET(APIBaseUrl + 'test', {"Accept": "application/json, text/plain, */*"}).respond();
    $http.get(APIBaseUrl + 'test', {"Accept": "application/json, text/plain, */*"});
    $httpBackend.flush();
  });

  it('should save token to local storage', function () {
    expect(storage.get('token')).toBeUndefined();
    logIn();
    expect(storage.get('token')).toBe('take-on-me');
  });

  it('should use the token from local storage if defined', function () {
    storage.set('token', 'awesome');
    expect(authentication.getToken()).toBe('awesome');
  });

  it('should reject the promise if the password or username is wrong', function () {
    $httpBackend.expectPOST(APIBaseUrl + 'authentication/login', {
      username: 'wrong',
      password: 'pw'
    }).respond(403, loginFailedResponse);

    var failed = jasmine.createSpy('failed');
    var success = jasmine.createSpy('success');
    var done = jasmine.createSpy('finally');

    authentication.login('password', 'wrong', 'pw').then(success).catch(failed).finally(done);
    $httpBackend.flush();

    expect(failed).toHaveBeenCalled();
    expect(success).not.toHaveBeenCalled();
  });

  it('should set the current user on login', function () {
    logIn();
    deferred.resolve({
      profile: 'registered'
    });
    $rootScope.$digest();
    expect(CurrentUser.hasRoles('role')).toBeFalsy();
  });

  it('should remove the current user on logout', function () {
    authentication.logout();
    expect(CurrentUser.unset).toHaveBeenCalled();
  });

});
