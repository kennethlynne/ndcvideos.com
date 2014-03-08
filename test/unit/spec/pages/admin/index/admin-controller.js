'use strict';

describe('Controller(/admin): AdminCtrl', function () {

    var AdminCtrl, $rootScope, scope, promise, deferred, UserRepository, VideoRepository, userModel, vimeoAPI;

    beforeEach(function () {

        function getPromise() {
            return promise;
        }

        userModel = {
            $save: jasmine.createSpy('userModel.$save').andCallFake(getPromise)
        };

        UserRepository = {
            getAll: jasmine.createSpy('UserRepository.getAll').andCallFake(getPromise),
            create: jasmine.createSpy('UserRepository.create').andCallFake(function (user) {
                expect(user).toEqual({userName: 'test@internet.com'});
                return userModel;
            })
        };

        VideoRepository = {
            getAll: jasmine.createSpy('VideoRepository.getAll').andCallFake(getPromise)
        };

        vimeoAPI = {
          getVideos: jasmine.createSpy('vimeoAPI.getVideos').andCallFake(getPromise)
        };

        module('ndc');

        inject(function ($controller, _$rootScope_, $q) {
            deferred = $q.defer();
            promise = deferred.promise;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            AdminCtrl = $controller('AdminCtrl', {
                $scope: scope,
                UserRepository: UserRepository,
                VideoRepository: VideoRepository,
                vimeoAPI: vimeoAPI
            });
        });
    });

    it('should list users', function() {
        deferred.resolve([1,2,3,4,5]);
        $rootScope.$digest();
        expect(scope.users.length).toBe(5);
    });

    it('should list existing videos', function() {
        deferred.resolve([1,2,3,4,5]);
        $rootScope.$digest();
        expect(scope.existingVideos.length).toBe(5);
    });

    it('should list videos from vimeo', function () {

        deferred.resolve([1,2,3,4,5]);
        $rootScope.$digest();
        expect(scope.vimeoVideos.length).toBe(5);

    });

    it('should create a new user', function() {
        expect(scope.isCreatingNewUser).toBeFalsy();
        scope.createUser();
        expect(scope.isCreatingNewUser).toBeTruthy();
    });

    it('should create an instance of a user model', function() {
        scope.saveUser({userName: 'test@internet.com'});
        expect(UserRepository.create).toHaveBeenCalled();
    });

    it('should save the user', function() {
        scope.isCreatingNewUser = true;
        scope.saveUser({userName: 'test@internet.com'});
        expect(scope.isCreatingNewUser).toBeFalsy();
    });

    it('should reset newUser', function() {
        scope.saveUser({userName: 'test@internet.com'});
        deferred.resolve();
        $rootScope.$digest();
        expect(scope.newUser).toEqual({});
    });

    it('should remove the user from users if save fails', function() {
        scope.isCreatingNewUser = true;
        scope.newUser = 'new user';
        expect(scope.users.length).toBe(0);

        scope.saveUser({userName: 'test@internet.com'});
        expect(scope.users.length).toBe(1);
        expect(scope.isCreatingNewUser).toBeFalsy();

        deferred.reject();
        $rootScope.$digest();
        expect(scope.isCreatingNewUser).toBeTruthy();
        expect(scope.newUser).toBe('new user');
        expect(scope.users.length).toBe(0);
    });

    it('should reset fields for new user', function() {
        scope.isCreatingNewUser = true;
        scope.newUser = 'new user';
        scope.resetNewUser();
        expect(scope.isCreatingNewUser).toBeFalsy();
        expect(scope.newUser).toEqual({});
    });

});