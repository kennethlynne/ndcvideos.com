'use strict';

describe('Service: stateHistory', function () {

    var stateHistory;

    beforeEach(function () {

        module('ndc');

        inject(function (_stateHistory_) {
            stateHistory = _stateHistory_;
        });

    });


    it('should do something', function () {
        expect(!!stateHistory).toBe(true);
    });

});