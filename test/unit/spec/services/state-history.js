'use strict';

describe('Service: stateHistory', function () {

    var stateHistory, $state;

    beforeEach(function () {

        $state = {
            go: jasmine.createSpy('$state.go')
        };

        module('ndc', function ($provide) {
            $provide.value('$state', $state);
        });

        inject(function (_stateHistory_) {
            stateHistory = _stateHistory_;
        });

    });

    it('should do something', function () {
        expect(!!stateHistory).toBe(true);
    });

    it('should remember a state', function () {
        stateHistory.go('state', {awesome: true})
        expect(stateHistory.pop()).toEqual({name: 'state', params: {awesome: true}})
    });

    it('should return a default state if history is empty', function () {
        expect(stateHistory.history.length).toBe(0);
        expect(stateHistory.pop()).toEqual({name: 'index', params: {}})
    });

    it('should go back', function () {
        var fixed = {name: 'state', params: {}};
        stateHistory.pop = function () {
            return fixed
        };
        stateHistory.back();

        expect($state.go).toHaveBeenCalledWith(fixed.name, fixed.params);
    });

});