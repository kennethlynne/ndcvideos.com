'use strict';

describe('Component: mediaPlayerComponent', function () {

  describe('Directive: mediaPlayerComponent', function () {
    var element, scope, $compile, vimeoVideo = {id: 1, videoId: '23919731', type: 'vimeo'},
      youtubeVideo = {id: 1, videoId: '23919731', type: 'youtube'};

    beforeEach(function () {

      module('ndc');

      inject(function ($rootScope, _$compile_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
      });

    });

    it('should render a vimeo video', function () {
      scope.video = vimeoVideo;
      element = angular.element('<media-player-component video="video" height="281" width="500"></media-player-component>');
      element = $compile(element)(scope);
      scope.$digest();

      expect(element.html()).toContain('vimeo');
    });

    it('should render a youtube video', function () {
      scope.video = youtubeVideo;
      element = angular.element('<media-player-component video="video" height="281" width="500"></media-player-component>');
      element = $compile(element)(scope);
      scope.$digest();

      expect(element.html()).toContain('youtube');
    });

    it('should give an appropriate error message when no video found', function () {

      scope.video = null;
      element = angular.element('<media-player-component video="video" height="281" width="500"></media-player-component>');
      element = $compile(element)(scope);
      scope.$digest();

      expect(element.find('.error').html()).toContain('The video was not found');
    });

  });

  describe('Controller: mediaPlayerComponentCtrl', function () {

    var Ctrl, scope, video;

    beforeEach(function () {

      module('ndc');

      inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        scope.video = {id: 1, videoId: '23919731', type: 'vimeo'};;
        Ctrl = $controller('mediaPlayerComponentCtrl', {
          $scope: scope
        });
      });
    });

  });

});