'use strict';

describe('Service: authentication', function () {

    var authentication, $httpBackend, BaseUrl, $http, loginSuccessfullResponse;

    beforeEach(function () {

        module('ndc');

        loginSuccessfullResponse = {
            "access_token":"take-on-me",
            "token_type":"bearer",
            "expires_in":1209599,
            "userName":"Ali",
            ".issued":"Mon, 14 Oct 2013 06:53:32 GMT",
            ".expires":"Mon, 28 Oct 2013 06:53:32 GMT"
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
        expect(authentication.isLoggedIn()).toBeFalsy();
    });

    it('should POST credentials to the server on log in', function() {
        $httpBackend.expectPOST( BaseUrl + 'token', 'grant_type=password&username=Ali&password=password123',             {
            'Content-Type':'application/x-www-form-urlencoded',
            'Accept':'application/json, text/plain, */*'
        }).respond();
        authentication.login('password', 'Ali', 'password123');
        $httpBackend.flush();
    });

    it('should return undefined token when not logged in', function() {
        expect(authentication.getToken()).toBeUndefined();
    });

    it('should remember token', function() {
        $httpBackend.expectPOST( BaseUrl + 'token', 'grant_type=password&username=Ali&password=password123',
            {
                'Content-Type':'application/x-www-form-urlencoded',
                'Accept':'application/json, text/plain, */*'
            }).respond(loginSuccessfullResponse);
        authentication.login('password', 'Ali', 'password123');
        $httpBackend.flush();

        expect(authentication.getToken()).toBe('take-on-me');
    });

    it('should not decorate requests not targeted at the API with token information', function() {
        $httpBackend.expectGET( 'test' ).respond();
        $http.get('test');
        $httpBackend.flush();
    });

    it('should decorate all subsequent requests to the API with the token information', function() {

        $httpBackend.expectPOST( BaseUrl + 'token', 'grant_type=password&username=Ali&password=password123',
            {
                'Content-Type':'application/x-www-form-urlencoded',
                'Accept':'application/json, text/plain, */*'
            }).respond(loginSuccessfullResponse);

        authentication.login('password', 'Ali', 'password123');
        $httpBackend.flush();

        $httpBackend.expectGET( 'test', {"Accept":"application/json, text/plain, */*","Authorization":"take-on-me"} ).respond();
        $http.get('test');
        $httpBackend.flush();
    });

    it('should indicate that the user is logged in', function() {

        $httpBackend.expectPOST( BaseUrl + 'token', 'grant_type=password&username=Ali&password=password123',
            {
                'Content-Type':'application/x-www-form-urlencoded',
                'Accept':'application/json, text/plain, */*'
            }).respond(loginSuccessfullResponse);
        authentication.login('password', 'Ali', 'password123');
        $httpBackend.flush();

        expect(authentication.isLoggedIn()).toBeTruthy();
    });

    it('should reset information on logout', function() {
        $httpBackend.expectPOST( BaseUrl + 'token', 'grant_type=password&username=Ali&password=password123',
            {
                'Content-Type':'application/x-www-form-urlencoded',
                'Accept':'application/json, text/plain, */*'
            }).respond(loginSuccessfullResponse);
        authentication.login('password', 'Ali', 'password123');
        $httpBackend.flush();

        expect(authentication.isLoggedIn()).toBeTruthy();
        expect(authentication.getToken()).toBeUndefined();
    });

});