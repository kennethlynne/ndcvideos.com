'use strict';

describe('Service: lodash', function () {

    var _;

    beforeEach(function () {

        module('ndc');

        inject(function (___) {
            _ = ___;
        });

    });


    it('should do something', function () {
        expect(!!_).toBe(true);
    });

});