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

      var wrapperDiv = element;
      var contentDiv = element.find('> *');

      scope.$watch(function () {
        return scrollLock.$$scrollLockEnabled;
      }, function (newVal) {
        if (newVal) {

          //Enable scroll lock

          scrollPos = $window.pageYOffset;

          wrapperDiv.css({
            'position': 'relative',
            'height': angular.element($window).innerHeight(),
            'overflow-y': 'hidden'
          });

          contentDiv.css({
            'position': 'fixed',
            'top': (-scrollPos) + 'px',
            'left': contentDiv.offset().left
          });

        }
        else {

          //Disable scroll lock / reset

          wrapperDiv.css({
            'position': 'relative',
            'overflow-y': 'auto',
            'height': '100%'
          });

          contentDiv.css({
            'position': 'relative',
            'top': 'inherit',
            'left': 'inherit'
          });

          angular.element($window).scrollTop(scrollPos);

        }

      });
    };

    return {
      restrict: 'A',
      link: _linkFn
    };

  });
