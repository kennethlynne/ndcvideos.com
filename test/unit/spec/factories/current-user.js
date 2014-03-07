'use strict';

describe('Service: CurrentUser', function () {

    var CurrentUser, data, $log;

    beforeEach(function () {

        $log = {
            error: jasmine.createSpy('$log.error')
        };

        module('ndc', function ($provide) {
            $provide.value('$log', $log);
        });

        data = {id:5, userName:"Root"};

        inject(function (_CurrentUser_) {
            CurrentUser = _CurrentUser_;
        });

    });


    it('should expose a get funciton', function () {
        expect(CurrentUser.get).toBeTruthy();
    });

    it('should set and get the correct data', function () {
        CurrentUser.set(data);
        expect(CurrentUser.get()).toEqual(data);
    });
    
    it('should unset all data', function () {
        CurrentUser.setPermissions(['troll']);
        CurrentUser.setRoles(['admin', 'god']);
        CurrentUser.set({name:'User'});
        CurrentUser.unset();
        expect(CurrentUser.getPermissions()).toEqual([]);
        expect(CurrentUser.getRoles()).toEqual([]);
        expect(CurrentUser.get().name).toBeUndefined();
    });

    it('should set the users permissions', function() {
        CurrentUser.setPermissions(['troll']);
        CurrentUser.setPermissions(['roll', 'eat', 'sleep']);
        expect(CurrentUser.getPermissions()).toEqual(['roll', 'eat', 'sleep']);
    });

    it('should return the users right', function() {
        CurrentUser.setPermissions(['roll', 'eat', 'sleep']);
        expect(CurrentUser.can('wear socks')).toBeFalsy();
        expect(CurrentUser.can('sleep')).toBeTruthy();
    });

    it('should set the users roles', function() {
        CurrentUser.setRoles(['admin', 'god']);
        CurrentUser.setRoles(['superadmin', 'god', 'washingmachine']);
        expect(CurrentUser.getRoles()).toEqual(['superadmin', 'god', 'washingmachine']);
    });

    it('should return the users role', function() {
        CurrentUser.setRoles(['superadmin', 'user']);
        expect(CurrentUser.is('god')).toBeFalsy();
        expect(CurrentUser.is('superadmin')).toBeTruthy();
        expect(CurrentUser.is('user')).toBeTruthy();
    });
    
});