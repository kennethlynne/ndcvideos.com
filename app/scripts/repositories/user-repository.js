'use strict';

angular.module('ndc')
    .factory('UserRepository', function ($injector, UserModel) {
        var BaseRepository = $injector.get('BaseRepository');
        return new BaseRepository({name: 'UserRepository', model: UserModel});
    });