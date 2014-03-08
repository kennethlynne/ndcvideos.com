'use strict';

describe('Controller: IndexCtrl', function () {

    var IndexCtrl, scope,$controller, VideoRepository, deffered, $q, promise, deferred, $rootScope, $stateParams = {};

    beforeEach(function () {
        module('ndc');
        inject(function (_$controller_, _$rootScope_, _$q_) {

            function getPromise() {
                return promise;
            }

            VideoRepository = {
                getByTags: jasmine.createSpy('VideoRepository.getByTags').andCallFake(getPromise),
                getAll: jasmine.createSpy('VideoRepository.getAll').andCallFake(getPromise)
            };

            scope = _$rootScope_.$new();
            $q = _$q_;
            deferred = $q.defer();
            promise = deferred.promise;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            InitializeController();
        });
    });


    function InitializeController()
    {
        IndexCtrl = $controller('IndexCtrl', {
            $scope: scope,
            VideoRepository:VideoRepository,
            $stateParams:$stateParams
        });
    }

    it('should attach a video to scope', function ()
    {
        deferred.resolve([1,2,3,4]);
        $rootScope.$digest();
        expect(scope.videos.length).toBe(4);
    });

    it('should attach videos to scope based on tags', function ()
    {
        $stateParams.tags = 'balle';
        InitializeController();

        deferred.resolve([1,2,3,4]);
        $rootScope.$digest();
        expect(scope.videos.length).toBe(4);
    });
});
