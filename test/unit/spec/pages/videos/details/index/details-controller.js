'use strict';

describe('Controller(videos/details): DetailsCtrl', function () {

    var DetailsCtrl, scope, video,
        VideoContext, $stateParams, deferred, $q, promise, $rootScope, $state;



    beforeEach(function () {

        VideoContext = {
            getById: jasmine.createSpy("videoContext.getById(1)").andCallFake(function ()
            {
                return promise;
            })
        };

        $stateParams = {videoId:1};

        video = {id:1, vimeoUrl:"horseWithBalls"};

        $state = {
            go: jasmine.createSpy('$state.go')
        };

        module('ndc', function ($provide) {
            $provide.value('VideoContext', VideoContext);
        });

        inject(function ($controller, _$rootScope_, _$q_) {
            scope = _$rootScope_.$new();
            $q = _$q_;
            deferred = $q.defer();
            promise = deferred.promise;
            $rootScope = _$rootScope_;

            DetailsCtrl = $controller('DetailsCtrl', {
                $scope: scope,
                $stateParams:$stateParams
            });

        });
    });

    it('should get a video with parameter ID and attach it to scope', function () {
        deferred.resolve(video);
        $rootScope.$digest();

        expect(scope.video).toEqual(video);
    });

    it('should redirect to error page on parameter not found', function () {
        video = null;

        deferred.resolve(video);
        $rootScope.$digest();

        expect($state.go).toHaveBeenCalledWith('error');
    });
});
