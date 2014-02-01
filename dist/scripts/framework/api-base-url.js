angular.module('ndc').factory('BaseUrl', function (Config) {
    return (Config.API.protocol + '://' + Config.API.host + ':' + Config.API.port + '/');
});