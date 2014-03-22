'use strict';

describe('Directive: ng-symbiosis-accesscontrol', function () {

    var accessControl;

    beforeEach(function () {

        module('ngSymbiosis.accessControl');

        inject(function (_accessControl_) {
            accessControl = _accessControl_;
        });

    });

    it('should unset all data', function () {
        accessControl.setPermissions(['troll']);
        accessControl.setRoles(['admin', 'god']);
        accessControl.unset();
        expect(accessControl.getPermissions()).toEqual([]);
        expect(accessControl.getRoles()).toEqual([]);
    });

    it('should set the users permissions', function () {
        accessControl.setPermissions(['troll']);
        accessControl.setPermissions(['roll', 'eat', 'sleep']);
        expect(accessControl.getPermissions()).toEqual(['roll', 'eat', 'sleep']);
    });

    it('should return the users right', function () {
        accessControl.setPermissions(['roll', 'eat', 'sleep']);
        expect(accessControl.can('wear socks')).toBeFalsy();
        expect(accessControl.can('sleep')).toBeTruthy();
    });

    it('should set the users roles', function () {
        accessControl.setRoles(['admin', 'god']);
        accessControl.setRoles(['superadmin', 'god', 'washingmachine']);
        expect(accessControl.getRoles()).toEqual(['superadmin', 'god', 'washingmachine']);
    });

    it('should return the users role', function () {
        accessControl.setRoles(['superadmin', 'user']);
        expect(accessControl.is('god')).toBeFalsy();
        expect(accessControl.is('superadmin')).toBeTruthy();
        expect(accessControl.is('user')).toBeTruthy();
    });

});

