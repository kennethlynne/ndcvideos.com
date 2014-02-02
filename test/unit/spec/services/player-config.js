'use strict';

describe('Service: PlayerConfig', function () {

    var PlayerConfig;

    beforeEach(function () {

        module('ndc');

        inject(function (_PlayerConfig_) {
            PlayerConfig = _PlayerConfig_;
        });

    });


    it('should do something', function () {
        expect(!!PlayerConfig).toBe(true);
    });

});