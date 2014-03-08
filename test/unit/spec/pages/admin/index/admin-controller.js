'use strict';

describe('Controller(/admin): AdminCtrl', function () {

    var AdminCtrl, $rootScope, scope, promise, deferred;

    beforeEach(function () {

        function getPromise() {
            return promise;
        }

        module('ndc');

        inject(function ($controller, _$rootScope_, $q) {
            deferred = $q.defer();
            promise = deferred.promise;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            AdminCtrl = $controller('AdminCtrl', {
                $scope: scope
            });
        });
    });

});