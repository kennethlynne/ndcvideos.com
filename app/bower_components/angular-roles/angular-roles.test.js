'use strict';

describe('ng-roles', function () {

  var ngRoles, myApp, guestProfile, managerProfile;

  beforeEach(function () {

    module('ngRoles');

    inject(function (_ngRoles_) {
      ngRoles = _ngRoles_;
    });

    // create application (module)
    myApp = ngRoles.addApplication('myapp', [ 'create', 'remove', 'view' ]);

    // create profile
    guestProfile = ngRoles.addProfile('guest');

    // create profile
    managerProfile = ngRoles.addProfile('manager');

  });

  describe('hasRoles', function () {
    it('should test roles', function () {
      guestProfile.addRoles('myapp.view');
      managerProfile.addRoles('myapp.*');
      myApp.addRoles('admin');

      expect(guestProfile.hasRoles('myapp.view')).toBeTruthy();
      expect(ngRoles.getProfile('guest').hasRoles('myapp.create')).toBeFalsy();
      expect(ngRoles.getProfile('manager').hasRoles('myapp.view', 'myapp.create')).toBeTruthy();
      expect(ngRoles.getProfile('manager').hasRoles('myapp.admin')).toBeTruthy();
    });
  });

  describe('hasAnyRoles', function () {
      it('should test roles', function() {
        guestProfile.addRoles('myapp.view');
        expect(ngRoles.getProfile('guest').hasAnyRoles('myapp.view', 'myapp.create')).toBeTruthy();
      });
  });

  describe('removeRoles', function () {
      it('should remove roles', function() {
        managerProfile.addRoles('myapp.*');
        myApp.removeRoles('create');
        expect(ngRoles.getProfile('manager').hasRoles('myapp.create')).toBeFalsy();
      });
  });

});

