'use strict';

describe('Controller(videos/details): DetailsCtrl', function () {

    var DetailsCtrl, scope, video,
        VideoContext, $stateParams, deferred, $q, promise, $rootScope, $state, init = [];



    beforeEach(function () {

        VideoContext = {
            getById: jasmine.createSpy("videoContext.getById").andCallFake(function ()
            {
                return promise;
            })
        };

        $stateParams = {videoId:1};

        init[0] = video = {id:1, vimeoId:'23919731'};

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
                init:init

            });

        });
    });

    it('should get a video with parameter ID and attach it to scope', function () {
        deferred.resolve('video');
        $rootScope.$digest();
        expect(scope.video).toEqual('video');
    });

    xit('should redirect to error page on parameter not found', function () {
        video.id = null;

        deferred.resolve(video);

        $rootScope.$digest();
        expect($state.go).toHaveBeenCalledWith('error', {code:404});
    });
});

describe('Service(videos/details): DetailsCtrlInit', function () {

    var DetailsCtrlInit;

    beforeEach(function () {

        module('ndc');

        inject(function (_DetailsCtrlInit_) {
            DetailsCtrlInit = _DetailsCtrlInit_;
        });

    });

    it('should have a prepare function', function () {
        expect(typeof DetailsCtrlInit.prepare).toEqual('function');
    });

    it('should return a promise', function () {
        expect(typeof DetailsCtrlInit.prepare().then).toEqual('function');
    });

});
