'use strict';

describe('Controller(/admin/administrate-users): AdministrateusersCtrl', function () {

  var AdminUsersCtrl, $rootScope, scope, promise, deferred, UserRepository, userModel;

  beforeEach(function () {

    function getPromise() {
      return promise;
    }

    userModel = {
      $save: jasmine.createSpy('userModel.$save').and.callFake(getPromise),
      $delete: jasmine.createSpy('userModel.$delete').and.callFake(getPromise)
    };

    UserRepository = {
      getAll: jasmine.createSpy('UserRepository.getAll').and.callFake(getPromise),
      create: jasmine.createSpy('UserRepository.create').and.callFake(function (user) {
        expect(user).toEqual({userName: 'test@internet.com'});
        return userModel;
      })
    };

    module('ndc');

    inject(function ($controller, _$rootScope_, $q) {
      deferred = $q.defer();
      promise = deferred.promise;
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();

      AdminUsersCtrl = $controller('AdministrateusersCtrl', {
        $scope: scope,
        UserRepository: UserRepository
      });
    });
  });

  it('should list users', function () {
    deferred.resolve([1, 2, 3, 4, 5]);
    $rootScope.$digest();
    expect(scope.filteredUsers.length).toBe(5);
  });

  it('should expose a paginated wrapped list of users', function () {
    var data = [1, 2, 3, 4, 5];
    deferred.resolve(data);
    $rootScope.$digest();
    expect(scope.filteredUsers).toEqual(data);
  });

  it('should create a new user', function () {
    expect(scope.isCreatingNewUser).toBeFalsy();
    scope.createUser();
    expect(scope.isCreatingNewUser).toBeTruthy();
  });

  it('should create an instance of a user model', function () {
    scope.saveUser({userName: 'test@internet.com'});
    expect(UserRepository.create).toHaveBeenCalled();
  });

  it('should save the user', function () {
    scope.isCreatingNewUser = true;
    scope.saveUser({userName: 'test@internet.com'});
    expect(scope.isCreatingNewUser).toBeFalsy();
  });

  it('should reset newUser', function () {
    scope.saveUser({userName: 'test@internet.com'});
    deferred.resolve();
    $rootScope.$digest();
    expect(scope.newUser).toEqual({});
  });

  it('should remove the user from users if save fails', function () {
    scope.isCreatingNewUser = true;
    scope.newUser = 'new user';
    expect(scope.userlist.length).toBe(0);

    scope.saveUser({userName: 'test@internet.com'});
    expect(scope.userlist.length).toBe(1);
    expect(scope.isCreatingNewUser).toBeFalsy();

    deferred.reject();
    $rootScope.$digest();
    expect(scope.isCreatingNewUser).toBeTruthy();
    expect(scope.newUser).toBe('new user');
    expect(scope.userlist.length).toBe(0);
  });

  it('should reset fields for new user', function () {
    scope.isCreatingNewUser = true;
    scope.newUser = 'new user';
    scope.resetNewUser();
    expect(scope.isCreatingNewUser).toBeFalsy();
    expect(scope.newUser).toEqual({});
  });

  it('should delete user', function () {
    scope.confirm = function () {
      return true
    };
    scope.deleteUser(userModel);
    expect(userModel.$delete).toHaveBeenCalled();
  });

  it('should remove user on successful delete', function () {
    scope.userlist.push(userModel);
    scope.deleteUser(userModel);
    deferred.resolve([]);
    $rootScope.$digest();
    expect(scope.userlist.length).toBe(0);
  });
});