describe('Model Repository: TagRepository', function () {

    var TagRepository, $httpBackend, Model, $rootScope, BaseRepository;

    beforeEach(function () {

        Model = function (p) {
            this.id = p.id;
        };

        Model.$settings = {
            url: 'URL'
        };

        module('ndc', function ($provide) {
            $provide.value('TagModel', Model);
        });

        inject(function (_TagRepository_, _$httpBackend_, _$rootScope_, $injector) {
            TagRepository = _TagRepository_;
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
        expect(TagRepository instanceof BaseRepository).toBeTruthy();
    });

    describe('getById', function () {
        it('should return models by id', function() {
            $httpBackend.expectGET(Model.$settings.url + '/5').respond(200, {id: 5});

            var promise = TagRepository.getById(5);

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
            TagRepository.getById(5);
            $httpBackend.flush();

            var promise = TagRepository.getById(5);

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

            var promise = TagRepository.getById(5),
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

            var promise = TagRepository.getAll();

            var Tag5, Tag6;
            promise.then(function (r) {
                Tag5 = r[0];
                Tag6 = r[1];
            });

            $httpBackend.flush();

            expect(Tag5 instanceof Model).toBeTruthy();
            expect(Tag5.id).toEqual(5);

            expect(Tag6 instanceof Model).toBeTruthy();
            expect(Tag6.id).toEqual(6);
        });

        it('should handle rejects', function() {
            $httpBackend.expectGET(Model.$settings.url).respond(404, 'No such thang!');

            var promise = TagRepository.getAll(5),
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
                TagRepository.attach({fails: true});
            }
            expect(wrapper).toThrow();
        });

        it('should return the attached model on subsequent requests', function() {

            TagRepository.attach(new Model({id: 5}));

            var Tag;

            TagRepository.getById(5).then(function (response) {
                Tag = response;
            });

            $rootScope.$digest();

            expect(Tag instanceof Model).toBeTruthy();
            expect(Tag.id).toEqual(5);
        });
    });

    describe('create', function () {
        it('should return a newed up instance of the Tag Model', function() {
            var Tag = TagRepository.create({title:'New title'});
            expect(Tag instanceof Model).toBeTruthy();
        });
    });

    describe('cache', function () {
        it('should return a reference to the pool', function() {
            var newTag = {id:19};
            TagRepository.cache[19] = newTag;

            var Tag;
            TagRepository.getById(19).then(function (response) {
                Tag = response;
            });
            $rootScope.$digest();

            expect(Tag).toBe(newTag);
        });
    });

    describe('saveChanges', function () {
       it('should save all changes in current Repository to the server');
    });
});