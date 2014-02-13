'use strict';

describe('Component: mediaPlayerComponent', function () {

    describe('Directive: mediaPlayerComponent', function () {
        var element, scope, $compile, vimeoVideo={id:1, videoId:'23919731', type:'vimeo'},
            youtubeVideo={id:1, videoId:'23919731', type:'youtube'};;

        beforeEach(function () {

            module('ndc');

            inject(function ($rootScope, _$compile_) {
                scope = $rootScope.$new();
                $compile = _$compile_;
            });

        });


        xit('should render a vimeo video', function() {
            scope.video = vimeoVideo;
            element = angular.element('<media-player-component video="video" height="281" width="500"></media-player-component>');
            element = $compile(element)(scope);
            scope.$digest();

            expect(element.html()).toContain('vimeo');
        });

        it('should render a youtube video', function() {
            scope.video = youtubeVideo;
            element = angular.element('<media-player-component video="video" height="281" width="500"></media-player-component>');
            element = $compile(element)(scope);
            scope.$digest();

            expect(element.html()).toContain('youtube');
        });

    });

    describe('Controller: mediaPlayerComponentCtrl', function () {

        var Ctrl, scope, element, video={id:1, videoId:'23919731', type:'vimeo'};

        beforeEach(function () {

            module('ndc');

            inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                scope.video = video;
                element = angular.element('<media-player-component video="video" height="281" width="500"></media-player-component>');
                Ctrl = $controller('mediaPlayerComponentCtrl', {
                    $scope: scope,
                    $element: element
                });
            });
        });

        xit('should render a message', function () {
        });
    });

});