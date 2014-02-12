angular.module('ngSymbiosis.utils', [])
    .constant('regexEscape', function regEsc(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    })
    .filter('offset', function () {
        return function (input, offset) {
            return input.slice(+offset);
        }
    })
    .value('guid', function guid() {
        function x() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        return x() + x() + '-' + x() + x() + '-' + x() + x() + x() + x();
    })
    .constant('dasherize', function (input) {
        return input
            .replace(/(?:^[A-Z]{2,})/g, function (match) { //XMLfileIsCool -> xml-fileIsCool
                return match.toLowerCase() + "-";
            })
            .replace(/(?:[A-Z]+)/g, function (match) { //camelCase -> snake-case
                return "-" + match.toLowerCase();
            })
            .replace(/^-/, ''); // CamelCase -> -snake-case -> snake-case
    })