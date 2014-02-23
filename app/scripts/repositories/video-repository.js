'use strict';

angular.module('ndc')
        .factory('VideoRepository', function ($injector, VideoModel) {
            var BaseRepository = $injector.get('BaseRepository');
            return new BaseRepository({name: 'Video', model: VideoModel});
        });