'use strict';

describe('Service: CurrentUser', function () {

    var CurrentUser, data;

    beforeEach(function () {

        module('ndc');


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
        expect(function (){CurrentUser.set(null)}).toThrow(new Error("No data defined when initializing CurrentUser"));
    });
    
});