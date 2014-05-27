'use strict';

describe('Service: CurrentUser', function () {

  var CurrentUser, data, $log, profiles;

  beforeEach(function () {

    $log = {
      error: jasmine.createSpy('$log.error')
    };

    profiles = {
      guest: {
        hasRoles: jasmine.createSpy('roles.guest.hasRoles')
      },
      administrator: {
        hasRoles: jasmine.createSpy('roles.administrator.hasRoles')
      }
    };

    module('ndc', function ($provide) {
      $provide.value('$log', $log);
      $provide.value('profiles', profiles);
    });

    data = {id: 5, userName: "Root"};

    inject(function (_CurrentUser_) {
      CurrentUser = _CurrentUser_;
    });

  });

  it('should expose a get function', function () {
    expect(CurrentUser.get).toBeTruthy();
  });

  it('should set and get the correct data', function () {
    CurrentUser.set(data);
    expect(CurrentUser.get()).toEqual(data);
  });

  it('should set data', function () {
    CurrentUser.set({name: 'User'});
    expect(CurrentUser.get().name).toBe('User');
  });

  it('should unset all data', function () {
    CurrentUser.set({name: 'User'});
    CurrentUser.unset();
    expect(CurrentUser.get().name).toBeUndefined();
  });

  it('should return the users roles', function () {
    expect(CurrentUser.hasRoles('something')).toBeFalsy();
    expect(profiles.guest.hasRoles).toHaveBeenCalledWith('something');
  });

  it('should use the current users profile if he has one', function () {
    CurrentUser.set({profile: 'administrator'});
    expect(CurrentUser.hasRoles('something')).toBeFalsy();
    expect(profiles.administrator.hasRoles).toHaveBeenCalledWith('something');
  });

  it('should use the default guest profile if the received profile is not found', function () {
    CurrentUser.set({profile: 'some random profile'});
    expect(CurrentUser.hasRoles('something')).toBeFalsy();
    expect(profiles.guest.hasRoles).toHaveBeenCalledWith('something');
  });

});