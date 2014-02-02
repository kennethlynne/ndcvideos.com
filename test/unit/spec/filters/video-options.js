'use strict';

describe('Filter: videoOptions', function () {

    var videoOptions;

    beforeEach(function () {

        module('ndc');

        inject(function ($filter) {
            videoOptions = $filter('videoOptions');
        });

    });

    it('should return the input prefixed with "videoOptions filter:"', function () {
        var text = 'angularjs';
        expect(videoOptions(text)).toBe('videoOptions filter: ' + text);
    });

});