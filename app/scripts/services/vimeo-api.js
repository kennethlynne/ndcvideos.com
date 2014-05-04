'use strict';

angular.module('ndc')
  .service('vimeoAPI', function vimeoAPI(videoImport) {
    return videoImport.provider('vimeo');
  });
