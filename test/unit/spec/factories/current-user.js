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

        data = {id:1, userName:"balle"};

        inject(function (_CurrentUser_) {
            CurrentUser = _CurrentUser_;
        });

    });


    it('should expose a get funciton', function () {
        expect(CurrentUser.get).toBeTruthy();
    });

    it('should set and get the correct data', function () {
        CurrentUser.set(data);
        expect(CurrentUser.get()).toBe(data);
    });
    
    it('should not set data if data not defined', function () {
        CurrentUser.set(null);
        expect($log.error).toHaveBeenCalled();
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
    
});