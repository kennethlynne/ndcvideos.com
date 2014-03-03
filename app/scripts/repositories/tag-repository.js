'use strict';

angular.module('ndc')
    .factory('TagRepository', function ($injector, TagModel) {
        var BaseRepository = $injector.get('BaseRepository');
        return new BaseRepository({name: 'TagRepository', model: TagModel});
    });