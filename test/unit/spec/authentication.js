'use strict';

describe('Service: authentication', function () {

    var authentication, $httpBackend, BaseUrl, $http, loginSuccessfullResponse, loginFailedResponse, logIn, $localStorage;

    beforeEach(function () {

        $localStorage = {};

        module('ndc', function ($provide) {
            $provide.value('$localStorage', $localStorage);
        });

        logIn = function logIn() {
            $httpBackend.expectPOST( BaseUrl + 'token', 'grant_type=password&username=Ali&password=password123',
                {
                    'Content-Type':'application/x-www-form-urlencoded',
                    'Accept':'application/json, text/plain, */*'
                }).respond(200, loginSuccessfullResponse);

            authentication.login('password', 'Ali', 'password123');
            $httpBackend.flush();
        };

        loginSuccessfullResponse = {
            "access_token":"take-on-me",
            "token_type":"bearer",
            "expires_in":1209599,
            "userName":"Ali",
            ".issued":"Mon, 14 Oct 2013 06:53:32 GMT",
            ".expires":"Mon, 28 Oct 2013 06:53:32 GMT"
        };

        loginFailedResponse = {
            message: 'Not authorized.'
        };

        inject(function (_authentication_, _$httpBackend_, _BaseUrl_, _$http_) {
            authentication = _authentication_;
            $httpBackend = _$httpBackend_;
            BaseUrl = _BaseUrl_;
            $http = _$http_;
        });

    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should return the current login state', function() {
        expect(authentication.isAuthenticated()).toBeFalsy();
    });

    it('should return undefined token when not logged in', function() {
        expect(authentication.getToken()).toBeUndefined();
    });

    it('should remember token', function() {
        logIn();
        expect(authentication.getToken()).toBe('take-on-me');
    });

    it('should not decorate requests not targeted at the API with token information', function() {
        logIn();
        $httpBackend.expectGET( 'external-api', {"Accept":"application/json, text/plain, */*"} ).respond();
        $http.get('external-api');
        $httpBackend.flush();
    });

    it('should decorate all subsequent requests to the API with the token information', function() {
        logIn();
        $httpBackend.expectGET( BaseUrl + 'test', {"Accept":"application/json, text/plain, */*","Authorization":"take-on-me"} ).respond();
        $http.get( BaseUrl + 'test' );
        $httpBackend.flush();
    });

    it('should indicate that the user is logged in', function() {
        logIn();
        expect(authentication.isAuthenticated()).toBeTruthy();
    });

    it('should reset information on logout', function() {
        logIn();
        authentication.logout();

        expect(authentication.getToken()).toBeUndefined();
        expect(authentication.isAuthenticated()).toBeFalsy();

        $httpBackend.expectGET( BaseUrl + 'test', {"Accept":"application/json, text/plain, */*"} ).respond();
        $http.get(BaseUrl + 'test', {"Accept":"application/json, text/plain, */*"});
        $httpBackend.flush();
    });

    it('should save token to local storage', function() {
        expect($localStorage.token).toBeUndefined();
        logIn();
        expect($localStorage.token).toBe('take-on-me');
    });
    
    it('should use the token from local storage if defined', function() {
        $localStorage.token = 'awesome';
        expect(authentication.getToken()).toBe('awesome');
    });

    it('should reject the promise if the password or username is wrong', function() {
        $httpBackend.expectPOST( BaseUrl + 'token', 'grant_type=password&username=wrong&password=pw',
            {
                'Content-Type':'application/x-www-form-urlencoded',
                'Accept':'application/json, text/plain, */*'
            }).respond(403, loginFailedResponse);

        var failed = jasmine.createSpy('failed');
        var success = jasmine.createSpy('success');
        var done = jasmine.createSpy('finally');

        authentication.login('password', 'wrong', 'pw').then(success).catch(failed).finally(done);
        $httpBackend.flush();

        expect(failed).toHaveBeenCalled();
        expect(success).not.toHaveBeenCalled();
    });

});