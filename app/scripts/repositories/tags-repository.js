'use strict';

angular.module('ndc')
    .factory('TagsRepository', function ($injector, TagsModel) {
        var BaseRepository = $injector.get('BaseRepository');
        return new BaseRepository({name: 'TagsRepository', model: TagsModel});
    });