'use strict';

angular.module('ndc')
  .service('scrollLock', function () {
    this.enable = function () {
      this.$$scrollLockEnabled = true;
    };
    this.disable = function () {
      this.$$scrollLockEnabled = false;
    };
  })
  .directive('scrollLock', function ($window, scrollLock) {

    var _linkFn = function link(scope, element) {
      var scrollPos = 0;
      var origMarginTop = angular.element(element).css('marginTop');

      scope.$watch(function () {
        return scrollLock.$$scrollLockEnabled;
      }, function (newVal) {
        if (newVal) {
          scrollPos = $window.pageYOffset;

          element.css({
            'height': angular.element($window).innerHeight(),
            'overflow': 'hidden'
          });

          element.find('> *').css({
            'position':'absolute',
            'top': (-scrollPos) + 'px'
          });
        }
        else {
          element.css({
            'position': 'relative',
            'overflow': 'auto',
            'height': '100%'
          });

          element.find('> *').css({
            'position':'relative',
            'top': 'inherit'
          });

          angular.element($window).scrollTop(scrollPos);
        }

      });
    };

    return {
      scope: {
        scrollLock: '='
      },
      restrict: 'A',
      link: _linkFn
    };

  });
