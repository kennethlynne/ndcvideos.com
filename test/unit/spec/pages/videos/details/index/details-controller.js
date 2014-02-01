'use strict';

describe('Controller(videos/details): DetailsCtrl', function () {

    var DetailsCtrl, scope, video,
        videoContext, $stateParams, deferred, $q, promise, $rootScope;



    beforeEach(function () {

        videoContext = {
            getById: jasmine.createSpy("videoContext.getById(1)").andCallFake(function ()
            {
                return promise;
            })
        };

        $stateParams = {videoId:1};

        video = {id:1, vimeoUrl:"horseWithBalls"};

        module('ndc', function ($provide) {
            $provide.value('videoContext', videoContext);
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

});
