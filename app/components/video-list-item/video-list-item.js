'use strict';

angular.module('ndc.components')
  .controller('videoListItemComponentCtrl', function ($scope) {
    
    $scope.toHHMMSS = function (seconds) {
      var sec_num = seconds;
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      
      if (hours > 0) {
        var time = hours + ':' + minutes + ':' + seconds;
      } else {
        var time = minutes + ':' + seconds;
      }

      return time;
    }

  })
  .component('videoListItem', function () {
    return {
      scope: {
        video: '='
      },
      controller: 'videoListItemComponentCtrl'
    };
  });