'use strict';

angular.module('ndc.components')
   /* .filter('videoOptions', function () {

        //Used to format query parameters for player
        return function (options) {
            var opts = [];
            angular.forEach(options, function (value, key) {
                opts.push([key, value].join('='));
            });
            return "?" + opts.join('&');
        }
    })
    .service('PlayerConfig', function(){

        this.createInstance = function (init) {
            var PlayerConfig = function (init) {
                this.playerRegExp = init.playerRegExp;
                this.whitelist = init.whitelist;
                this.config = {
                    width: 560,
                    height: 315,
                    playerID: init.playerID,
                    options: init.options
                };
                this.isPlayerFromURL = function (url) {
                    return (url.match(this.playerRegExp) != null);
                }
            };
            return new PlayerConfig(init);
        }
    })*/
    /*.factory('RegisteredPlayers', function(){

        var configurations = {
            youtube: {
                options: {
                    autoplay: 0,
                    controls: 1,
                    loop: 0,
                },
                whitelist: ['autoplay', 'controls', 'loop', 'playlist', 'rel'],
                playerID: 'www.youtube.com/embed/',
                protocol: 'http://',
                playerRegExp: /(http:\/\/|https:\/\/)www\.youtube\.com\/watch\?v=([A-Za-z0-9\-\_]+)/
            },
            youtubeNoCookie: {
                options: {
                    autoplay: 0,
                    controls: 1,
                    loop: 0,
                },
                whitelist: ['autoplay', 'controls', 'loop', 'playlist', 'rel'],
                playerID: 'www.youtube-nocookie.com/embed/',
                protocol: 'http://',
                playerRegExp: /(http:\/\/|https:\/\/)www\.youtube\-nocookie\.com\/watch\?v=([A-Za-z0-9\-\_]+)/
            },
            vimeo: {
                options: {
                    autoplay: 0,
                    loop: 0,
                },
                whitelist: ['autoplay', 'color', 'loop'],
                playerID: 'player.vimeo.com/video/',
                protocol: 'http://',
                playerRegExp: /(http:\/\/)vimeo\.com\/([A-Za-z0-9]+)/
            }
        };
        var players = [];
        angular.forEach(configurations, function (value, key) {
            players.push(PlayerConfig.createInstance(value));
        });
        return players;


    })*/
    .controller('mediaPlayerComponentCtrl', function ($scope, $element, $sce) {

        console.log($scope.video);
        $sce.trustAsResourceUrl($scope.video);
    })
    .component('mediaPlayer', function ($sce) {
        return {
            controller: 'mediaPlayerComponentCtrl',
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                video:'@'
            },
            link: function ($scope, element, attrs) {
                var ratio = (attrs.height / attrs.width) * 100;
                element[0].style.paddingTop = ratio + '%';
                console.log(element);


                /*var url = attrs.href;
                var player = null;

                //search for the right player in the list of registered players
                angular.forEach(RegisteredPlayers, function (value) {
                    if (value.isPlayerFromURL(url)) {
                        player = value;
                    }
                });

                var _config = player.config;
                _config.protocol = url.match(player.playerRegExp)[1];
                _config.videoID = url.match(player.playerRegExp)[2];


                $scope.video = _config.protocol + _config.playerID + _config.videoID;*/

                //TODO: Pass player options filtered by PlayerOptions filter: _config.options | videoOptions}}

                //the size of the player is treated differently than to the playback options
                /*$scope.config.height = (attrs.height && parseInt(attrs.height)) || $scope.config.height;
                $scope.config.width = (attrs.width && parseInt(attrs.width)) || $scope.config.width;*/



            }
        };
    });
