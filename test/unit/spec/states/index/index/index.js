'use strict';

describe('Controller: IndexCtrl', function () {

  var IndexCtrl, scope, $rootScope, deferred, promise;

  beforeEach(function () {

    module('ndc');

    inject(function ($controller, _$rootScope_, $q) {
      $rootScope = _$rootScope_;

      deferred = $q.defer();
      promise = deferred.promise;

      scope = $rootScope.$new();
      IndexCtrl = $controller('IndexCtrl', {
        $scope: scope
      });
    });
  });

});
