angular.module('ndc')
    .constant('regexEscape', function regEsc(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    });