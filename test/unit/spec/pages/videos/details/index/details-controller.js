'use strict';

describe('Controller(/videos/details): VideoDetailsCtrl', function () {

    var VideoDetailsCtrl, scope, video,
        VideoRepository, $stateParams, deferred, $q, promise, $rootScope, $state;

    beforeEach(function () {

        VideoRepository = {
            getById: jasmine.createSpy("VideoRepository.getById").andCallFake(function ()
            {
                return promise;
            })
        };

        $stateParams = {videoId:1};

        $state = {
            go: jasmine.createSpy('$state.go')
        };

        inject(function ($controller, _$rootScope_, _$q_) {
            scope = _$rootScope_.$new();
            $q = _$q_;
            deferred = $q.defer();
            promise = deferred.promise;
            $rootScope = _$rootScope_;

            VideoDetailsCtrl = $controller('VideoDetailsCtrl', {
                $scope: scope,
                $stateParams:$stateParams,
                $state: $state,
                VideoRepository: VideoRepository
            });

        });
    });

    it('should get a video with parameter ID and attach it to scope', function () {
        deferred.resolve('video');
        $rootScope.$digest();
        expect(scope.video).toEqual(video);
    });


    xit('should redirect to error page on parameter not found', function () {
        video.id = null;

        deferred.resolve(video);

        $rootScope.$digest();
        expect($state.go).toHaveBeenCalledWith('error', {code:404});
    });


});
