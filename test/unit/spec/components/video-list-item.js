'use strict';

describe('Component: videoListItemComponent', function () {

    describe('Directive: videoListItemComponent', function () {
        var element, scope, $compile, videoItem;


        videoItem = {id: 1, title: 'In The Open: Ellie Goulding - Guns And Horses', description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how long drive from Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.', duration: 1234, videoId: 23919731, type:'vimeo'};


        beforeEach(function () {

            module('ndc');

            inject(function ($rootScope, _$compile_) {
                scope = $rootScope.$new();
                $compile = _$compile_;
            });

        });

        it('should have the component class', function() {
            scope.video = videoItem;
            element = angular.element('<video-list-item-component video="video"></video-list-item-component>');
            element = $compile(element)(scope);
            scope.$digest();
            expect(element).toHaveClass('video-list-item-component');
        });

        it('should render a video object', function() {
            scope.video = videoItem;
            element = angular.element('<video-list-item-component video="video"></video-list-item-component>');
            element = $compile(element)(scope);
            scope.$digest();
            expect(element.find('.video').html()).toContain('Ellie Goulding');
        });

    });

    describe('Controller: videoListItemComponentCtrl', function () {

        var Ctrl, scope, element, $modal, video;

        video = {id: 1, title: 'In The Open: Ellie Goulding - Guns And Horses', description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how long drive from Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.', duration: 1234, videoId: 23919731, type:'vimeo'};


        beforeEach(function () {

            module('ndc');

            inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                element = angular.element('<video-list-item-component video="video"></video-list-item-component>');
                Ctrl = $controller('videoListItemComponentCtrl', {
                    $scope: scope,
                    $element: element,
                    $modal: $modal
                });
            });
        });

        it('should expose an add function to scope', function () {

            expect(typeof scope.addFavorite).toBe('function');

        });
    });

});