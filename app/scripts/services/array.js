'use strict';

angular.module('ndc')
  .service('array', function () {

    return function (array) {
      return {
        add: function (data) {
          Array.prototype.push.apply(array, data);
          return array;
        },
        set: function (data) {
          array.length = 0;
          this.add(data);
        }
      }
    }

  });
