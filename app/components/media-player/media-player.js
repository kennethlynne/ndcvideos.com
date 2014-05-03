'use strict';

angular.module('ndc.components')
  .filter('whitelist', function () {
    //Used to whitelist query parameters for players
    return function (options, whitelist) {
      var filteredOptions = {};
      angular.forEach(options, function (value, key) {
        if (whitelist.indexOf(key) !== -1) filteredOptions[key] = value;
      });
      return filteredOptions;
    }
  })
  .filter('videoOptions', function () {
    //Used to format query parameters for players
    return function (options) {
      var opts = [];
      angular.forEach(options, function (value, key) {
        opts.push([key, value].join('='));
      });
      return "?" + opts.join('&');
    }
  })
  .value('RegisteredPlayers', [
    {
      options: {
        autoplay: 0,
        controls: 1,
        loop: 0
      },
      width: 560,
      height: 315,
      whitelist: ['autoplay', 'controls', 'loop', 'playlist', 'rel'],
      playerId: 'www.youtube.com/embed/',
      protocol: 'http://',
      type: 'youtube',
      playerRegExp: /(http:\/\/|https:\/\/)www\.youtube\.com\/watch\?v=([A-Za-z0-9\-\_]+)/,
      getEmbedUrl: function (id) {
        return this.protocol + this.playerId + id;
      }
    },
    {
      options: {
        autoplay: 0,
        controls: 1,
        loop: 0
      },
      width: 560,
      height: 315,
      whitelist: ['autoplay', 'controls', 'loop', 'playlist', 'rel'],
      playerId: 'www.youtube-nocookie.com/embed/',
      protocol: 'http://',
      type: 'youtubenocookie',
      playerRegExp: /(http:\/\/|https:\/\/)www\.youtube\-nocookie\.com\/watch\?v=([A-Za-z0-9\-\_]+)/,
      getEmbedUrl: function (id) {
        return this.protocol + this.playerId + id;
      }
    },
    {
      options: {
        autoplay: 0,
        loop: 0
      },
      width: 560,
      height: 315,
      whitelist: ['autoplay', 'color', 'loop'],
      playerId: 'player.vimeo.com/video/',
      protocol: 'http://',
      type: 'vimeo',
      playerRegExp: /(http:\/\/)vimeo\.com\/([A-Za-z0-9]+)/,
      getEmbedUrl: function (id) {
        return this.protocol + this.playerId + id + "?title=0&;byline=0&;portrait=0&;color=1bb775&html5=1";
      }
    }
  ])
  .controller('mediaPlayerComponentCtrl',
  function ($scope, $log, RegisteredPlayers, $filter, $sce, _) {
    if (!$scope.video) {
      $log.error('Media player component can not be initialized without a video.');
      return;
    }
    var player = _.find(RegisteredPlayers, function (playerCfg) {
        return playerCfg.type === $scope.video.type;
      }),
      options = player.options,
      url = player.getEmbedUrl($scope.video.videoId) +
        $filter('videoOptions')(options).toString();

    $scope.videoUrl = $sce.trustAs('resourceUrl', url);
  })
  .component('mediaPlayer', function () {
    return {
      controller: 'mediaPlayerComponentCtrl',
      restrict: 'E',
      replace: true,
      scope: {
        video: '='
      },
      link: function (scope, element, attrs) {
        //Styling for aspect ratio
        var ratio = (attrs.height / attrs.width) * 100;
        element[0].style.paddingTop = ratio + '%';
        scope.width = attrs.width;
        scope.height = attrs.height;
      }
    };
  });