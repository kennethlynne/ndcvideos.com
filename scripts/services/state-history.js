'use strict';

angular.module('ndc')
    .run(function ($rootScope, $state, stateHistory) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
            $state.previous = fromState;
            stateHistory.go(toState, toParams);
        });
    })
    .service('stateHistory', function stateHistory($state) {

        this.history = [];

        this.go = function (state, params) {
            this.history.push({
                name: state,
                params: params
            });
        };

        this.back = function () {
            this.pop();
            var prevState = this.pop();
            $state.go(prevState.name, prevState.params);
        };

        this.pop = function () {
            return this.history.pop() || {name:'index', params: {}};
        }

    });
