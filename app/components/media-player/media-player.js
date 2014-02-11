'use strict';

angular.module('ndc.components')
    .filter('videoOptions', function () {

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
                this.type = init.type;
                this.config = {
                    width: 560,
                    height: 315,
                    playerID: init.playerID,
                    options: init.options
                };
                this.isPlayerFromURL = function (url) {
                    return (url.match(this.playerRegExp) != null);
                };
                this.isPlayerFromType = function(type){
                	return this.type == type;
                }
                this.getEmbedUrl = function(videoId){
                	return init.protocol + init.playerID + videoId;
                }
                
                
            };
            return new PlayerConfig(init);
        }
    })
    .factory('RegisteredPlayers', function(PlayerConfig){

        var configurations = {
            youtube: {
                options: {
                    autoplay: 0,
                    controls: 1,
                    loop: 0
                },
                whitelist: ['autoplay', 'controls', 'loop', 'playlist', 'rel'],
                playerID: 'www.youtube.com/embed/',
                protocol: 'http://',
                type:'youtube',
                playerRegExp: /(http:\/\/|https:\/\/)www\.youtube\.com\/watch\?v=([A-Za-z0-9\-\_]+)/
            },
            youtubeNoCookie: {
                options: {
                    autoplay: 0,
                    controls: 1,
                    loop: 0
                },
                whitelist: ['autoplay', 'controls', 'loop', 'playlist', 'rel'],
                playerID: 'www.youtube-nocookie.com/embed/',
                protocol: 'http://',
                type:'youtubenocookie',
                playerRegExp: /(http:\/\/|https:\/\/)www\.youtube\-nocookie\.com\/watch\?v=([A-Za-z0-9\-\_]+)/
            },
            vimeo: {
                options: {
                    autoplay: 0,
                    loop: 0
                },
                whitelist: ['autoplay', 'color', 'loop'],
                playerID: 'player.vimeo.com/video/',
                protocol: 'http://',
                type:'vimeo',
                playerRegExp: /(http:\/\/)vimeo\.com\/([A-Za-z0-9]+)/
            }
        };
        var players = [];
        angular.forEach(configurations, function (value, key) {
            players.push(PlayerConfig.createInstance(value));
        });
        return players;


    })
    .controller('mediaPlayerComponentCtrl', function ($scope, RegisteredPlayers, $filter, $sce) {

        var player = null;
        var url = null;

        //search for the right player in the list of registered players
        angular.forEach(RegisteredPlayers, function (value) {
            if (value.isPlayerFromType($scope.video.type)) {
                player = value;
                url = value.getEmbedUrl($scope.video.videoId);
            }

        });

        var config = player.config;

        var kjekse = $filter('videoOptions')(config.options).toString();
        var tjukk = url + kjekse;
        
        $sce.trustAsResourceUrl(tjukk);

        $scope.videoUrl = tjukk;

        //copy configuration from player

        //overwrite playback options
/*        angular.forEach($filter('whitelist')(attrs, player.whitelist), function (value, key) {
            $scope.config.options[key] = value;
        });*/

    })
    .component('mediaPlayer', function () {
        return {
            controller: 'mediaPlayerComponentCtrl',
            restrict: 'E',
            replace: true,
//            transclude: true,
            scope: {
                video:'='
            },
            link: function (scope, element, attrs) {
                var ratio = (attrs.height / attrs.width) * 100;
                element[0].style.paddingTop = ratio + '%';

                scope.width = attrs.width;
                scope.height = attrs.height;

                //TODO: Pass player options filtered by PlayerOptions filter: _config.options | videoOptions}}

                //the size of the player is treated differently than to the playback options
                /*$scope.config.height = (attrs.height && parseInt(attrs.height)) || $scope.config.height;
                $scope.config.width = (attrs.width && parseInt(attrs.width)) || $scope.config.width;*/



            }
        };
    });
