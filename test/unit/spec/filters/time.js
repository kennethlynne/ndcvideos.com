'use strict';

describe('Filter: time', function () {

    var time;

    beforeEach(function () {

        module('ndc');

        inject(function ($filter) {
            time = $filter('time');
        });

    });

    it('should return the input if it is not valid', function() {
        expect(time()).toBeUndefined();
        expect(time('text')).toBe('text');
        expect(time({})).toEqual({});
    });

    it('should return the input as hh:mm:ss', function () {
        expect(time('90')).toBe('1:30');
        expect(time('120')).toBe('2:00');
        expect(time('3600')).toBe('1:00:00');
        expect(time('3622')).toBe('1:00:22');
        expect(time('3682')).toBe('1:01:22');
        expect(time(String(60*10+15))).toBe('10:15');
        expect(time(String(60*60+15))).toBe('1:00:15');
        expect(time(String(12*60*60+60*12+15))).toBe('12:12:15');
        expect(time(String(123*60*60+15))).toBe('123:00:15');
        expect(time(123*60*60+15)).toBe('123:00:15');
    });

});