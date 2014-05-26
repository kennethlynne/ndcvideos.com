'use strict';

angular.module('ndc')
  .directive('scrollLock', function ($window) {

    var _linkFn = function link(scope, element) {
      var scrollPos = 0;

      scope.$watch('scrollLock', function (newVal) {
        if (newVal) {
          scrollPos = $window.pageYOffset;
          element.css({
            'position': 'absolute',
            'top': -scrollPos + 'px'
          });
        }
        else {
          element.css({
            'position': 'relative',
            'top': '0px'
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
