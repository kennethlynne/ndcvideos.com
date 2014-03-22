'use strict';

angular.module('ndc')
    .service('navbar', function navbar(_, $log) {

        this.templateSrc = 'components/navbar/panels/navigation.html';

        var allowedStates = [
            'settings',
            'navigation',
            'notifications'
        ];

        this.isActive = function (state) {
            return state == this.state;
        };

        this.setState = function (state) {
            if (_.indexOf(allowedStates, state) >= 0) {
                this.state = state;
                this.templateSrc = 'components/navbar/panels/' + state + '.html';
            }
            else
            {
                $log.error('State ' + state + ' does not exist');
            }
        };

        this.setState('navigation');
    });
