describe('Model Repository: FavoriteRepository', function () {

    var FavoriteRepository, $httpBackend, Model, $rootScope, BaseRepository;

    beforeEach(function () {

        Model = function (p) {
            this.id = p.id;
        };

        Model.$settings = {
            url: 'URL'
        };

        module('ndc', function ($provide) {
            $provide.value('FavoriteModel', Model);
        });

        inject(function (_FavoriteRepository_, _$httpBackend_, _$rootScope_, $injector) {
            FavoriteRepository = _FavoriteRepository_;
            $httpBackend = _$httpBackend_;
            BaseRepository = $injector.get('BaseRepository');
            $rootScope = _$rootScope_;
        });

    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be an instance of BaseRepository', function() {
        expect(FavoriteRepository instanceof BaseRepository).toBeTruthy();
    });

    describe('getAllByUserId', function () {
        it('should return favorites by user id', function() {
            $httpBackend.expectGET(Model.$settings.url + '/5').respond(200, [ {id: 5}, {id: 6} ]);

            var promise = FavoriteRepository.getAllByUserId(5);

            var response;
            promise.then(function (r) {
                response = r;
            });

            $httpBackend.flush();

            expect(response.length).toBe(2);
            expect(response[0] instanceof Model).toBeTruthy();
            expect(response[0].id).toEqual(5);

            expect(response[1] instanceof Model).toBeTruthy();
            expect(response[1].id).toEqual(6);
        });

        it('should not do subsequent calls if model already exits in pool', function() {
            $httpBackend.expectGET(Model.$settings.url + '/5').respond(200, [ {id: 5}, {id: 6} ]);
            FavoriteRepository.getAllByUserId(5);
            $httpBackend.flush();

            var promise = FavoriteRepository.getAllByUserId(5);

            var response;
            promise.then(function (r) {
                response = r;
            });

            $rootScope.$digest();

            expect(response[0] instanceof Model).toBeTruthy();
            expect(response[0].id).toEqual(5);
        });

        it('should handle rejects', function() {
            $httpBackend.expectGET(Model.$settings.url + '/5').respond(404, 'No such thang!');

            var promise = FavoriteRepository.getAllByUserId(5),
                response,
                success = jasmine.createSpy('success'),
                error = jasmine.createSpy('error');

            promise.then(success).catch(error);

            $httpBackend.flush();

            expect(success).not.toHaveBeenCalled();
            expect(error).toHaveBeenCalled();
        });
    });

    describe('attach', function () {

        it('should throw if trying to attach a model that is not of valid type', function() {
            function wrapper() {
                FavoriteRepository.attach({fails: true});
            }
            expect(wrapper).toThrow();
        });

        it('should return the attached model on subsequent requests', function() {

            FavoriteRepository.attach({id: 5, favourites: [ new Model({id:3}) ]});

            var Favorite;

            FavoriteRepository.getAllByUserId(5).then(function (response) {
                Favorite = response[0];
            });

            $rootScope.$digest();

            expect(Favorite instanceof Model).toBeTruthy();
            expect(Favorite.id).toEqual(3);
        });
    });

    describe('create', function () {
        it('should return a newed up instance of the Favorite Model', function() {
            var Favorite = FavoriteRepository.create({title:'New title'});
            expect(Favorite instanceof Model).toBeTruthy();
        });
    });

    describe('cache', function () {
        it('should return a reference to the pool', function() {
            var newFavorite = {id:19};
            FavoriteRepository.cache[5] = {
                '19': newFavorite
            };

            var Favorite;
            FavoriteRepository.getAllByUserId(5).then(function (response) {
                Favorite = response[0];
            });
            $rootScope.$digest();

            expect(Favorite).toEqual(newFavorite);
        });
    });

    describe('saveChanges', function () {
       it('should save all changes in current Repository to the server');
    });
});