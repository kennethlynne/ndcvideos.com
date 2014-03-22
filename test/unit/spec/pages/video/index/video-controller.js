'use strict';

describe('Controller(/video): VideoCtrl', function () {

    var VideoCtrl, scope, promise, deferred, VideoRepository, $rootScope, stateHistory;

    beforeEach(function () {

        module('ndc');

        function getPromise() {
            return promise;
        }

        VideoRepository = {
            getById: jasmine.createSpy('VideoRepository.getById').andCallFake(getPromise)
        };

        stateHistory = {
            back: jasmine.createSpy('stateHistory.back')
        };

        inject(function ($controller, _$rootScope_, $q) {
            deferred = $q.defer();
            promise = deferred.promise;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();

            VideoCtrl = $controller('VideoCtrl', {
                $scope: scope,
                VideoRepository: VideoRepository,
                stateHistory: stateHistory
            });
        });
    });

    it('should attach a video to scope', function () {
        deferred.resolve('video');
        $rootScope.$digest();
        expect(scope.video).toEqual('video');
    });

    it('should close the modal', function() {
        scope.closeModal();
        expect(stateHistory.back).toHaveBeenCalled();
    });
});
