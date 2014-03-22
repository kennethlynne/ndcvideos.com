'use strict';

describe('Directive: ngSymbiosis.utils', function(){

    describe('Filter: offset', function () {

        var offset;

        beforeEach(function () {

            module('ngSymbiosis.utils');

            inject(function ($filter) {
                offset = $filter('offset');
            });

        });

        it('should remove the number of items specified:"', function () {
            expect(offset('angularjs', 3)).toBe('ularjs');
            expect(offset([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([4, 5, 6, 7]);
        });

    });

    describe('Service: dasherize', function () {

        var dasherize;

        beforeEach(function () {

            module('ngSymbiosis.utils');

            inject(function (_dasherize_) {
                dasherize = _dasherize_;
            });

        });

        it('should do something', function () {
            expect(!!dasherize).toBe(true);
        });

        it('should apply snake-case to component name - ex. snakeCase -> snake-case', function () {
            expect(dasherize('snakeCase')).toBe('snake-case');
            expect(dasherize('snakeCaseCase')).toBe('snake-case-case');
            expect(dasherize('snakeCaseCaseSnake')).toBe('snake-case-case-snake');
        });

        it('should not split multiple capital letters into camelCase (i.e. NameXML -> name-xml', function () {
            expect(dasherize('nameXML')).toBe('name-xml');
        });

        it('should not snake case the first letter', function () {
            expect(dasherize('NameXML')).toBe('name-xml');
        });

        it('should transform XMLfile to xml-file', function() {
            expect(dasherize('XMLfileIsCool')).toBe('xml-file-is-cool');
        });
    });

});



