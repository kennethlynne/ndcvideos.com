'use strict';

angular.module('ndc')
    .filter('time', function () {
        return function (input) {
            if ((typeof input == 'string' && /\d/g.test(input)) || (typeof input == 'number')) {
                var s = parseInt(input);
                var h = Math.floor(s / 3600);
                s %= 3600;
                var m = Math.floor(s / 60)
                m = ((h > 0 && m < 10 ? '0' : '') + m).substring(0, 2);
                s %= 60;
                s = ((s < 10 ? '0' : '') + s).substring(0, 2);
                return (h ? h + ':' : '') + (m || h ? m + ':' : ':') + s;
            }
            else {
                return input;
            }
        };
    });
