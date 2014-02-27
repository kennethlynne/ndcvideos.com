describe('Model Repository: TagsRepository', function () {

    var TagsRepository, $httpBackend, Model, $rootScope, BaseRepository;

    beforeEach(function () {

        Model = function (p) {
            this.id = p.id;
        };

        Model.$settings = {
            url: 'URL'
        };

        module('ndc', function ($provide) {
            $provide.value('TagsModel', Model);
        });

        inject(function (_TagsRepository_, _$httpBackend_, _$rootScope_, $injector) {
            TagsRepository = _TagsRepository_;
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
        expect(TagsRepository instanceof BaseRepository).toBeTruthy();
    });

    describe('getById', function () {
        it('should return models by id', function() {
            $httpBackend.expectGET(Model.$settings.url + '/5').respond(200, {id: 5});

            var promise = TagsRepository.getById(5);

            var response;
            promise.then(function (r) {
                response = r;
            });

            $httpBackend.flush();

            expect(response instanceof Model).toBeTruthy();
            expect(response.id).toEqual(5);
        });

        it('should not do subsequent calls if model already exits in pool', function() {
            $httpBackend.expectGET(Model.$settings.url + '/5').respond(200, {id: 5});
            TagsRepository.getById(5);
            $httpBackend.flush();

            var promise = TagsRepository.getById(5);

            var response;
            promise.then(function (r) {
                response = r;
            });

            $rootScope.$digest();

            expect(response instanceof Model).toBeTruthy();
            expect(response.id).toEqual(5);
        });

        it('should handle rejects', function() {
            $httpBackend.expectGET(Model.$settings.url + '/5').respond(404, 'No such thang!');

            var promise = TagsRepository.getById(5),
                response,
                success = jasmine.createSpy('success'),
                error = jasmine.createSpy('error');

            promise.then(success).catch(error);

            $httpBackend.flush();

            expect(success).not.toHaveBeenCalled();
            expect(error).toHaveBeenCalled();
        });
    });

    describe('getAll', function () {
        it('should return models by id', function() {
            $httpBackend.expectGET(Model.$settings.url).respond(200, [{id: 5},{id: 6}]);

            var promise = TagsRepository.getAll();

            var Tags5, Tags6;
            promise.then(function (r) {
                Tags5 = r[0];
                Tags6 = r[1];
            });

            $httpBackend.flush();

            expect(Tags5 instanceof Model).toBeTruthy();
            expect(Tags5.id).toEqual(5);

            expect(Tags6 instanceof Model).toBeTruthy();
            expect(Tags6.id).toEqual(6);
        });

        it('should handle rejects', function() {
            $httpBackend.expectGET(Model.$settings.url).respond(404, 'No such thang!');

            var promise = TagsRepository.getAll(5),
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
                TagsRepository.attach({fails: true});
            }
            expect(wrapper).toThrow();
        });

        it('should return the attached model on subsequent requests', function() {

            TagsRepository.attach(new Model({id: 5}));

            var Tags;

            TagsRepository.getById(5).then(function (response) {
                Tags = response;
            });

            $rootScope.$digest();

            expect(Tags instanceof Model).toBeTruthy();
            expect(Tags.id).toEqual(5);
        });
    });

    describe('create', function () {
        it('should return a newed up instance of the Tags Model', function() {
            var Tags = TagsRepository.create({title:'New title'});
            expect(Tags instanceof Model).toBeTruthy();
        });
    });

    describe('cache', function () {
        it('should return a reference to the pool', function() {
            var newTags = {id:19};
            TagsRepository.cache[19] = newTags;

            var Tags;
            TagsRepository.getById(19).then(function (response) {
                Tags = response;
            });
            $rootScope.$digest();

            expect(Tags).toBe(newTags);
        });
    });

    describe('saveChanges', function () {
       it('should save all changes in current Repository to the server');
    });
});