describe('Model Repository: UserRepository', function () {

    var UserRepository, $httpBackend, UserModel, $rootScope;

    beforeEach(function () {

        module('ndc');

        inject(function (_UserRepository_, _$httpBackend_, _UserModel_, _$rootScope_) {
            UserRepository = _UserRepository_;
            $httpBackend = _$httpBackend_;
            UserModel = _UserModel_;
            $rootScope = _$rootScope_;
        });

    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getById', function () {
        it('should return models by id', function() {
            $httpBackend.expectGET(UserModel.$urlBase + '/5').respond(200, {id: 5, title:'User title'});

            var promise = UserRepository.getById(5);

            var response;
            promise.then(function (r) {
                response = r;
            });

            $httpBackend.flush();

            expect(response instanceof UserModel).toBe(true);
            expect(response.id).toEqual(5);
            expect(response.title).toEqual('User title');
        });

        it('should not do subsequent calls if model already exits in pool', function() {
            $httpBackend.expectGET(UserModel.$urlBase + '/5').respond(200, {id: 5, title:'User title'});
            UserRepository.getById(5);
            $httpBackend.flush();

            var promise = UserRepository.getById(5);

            var response;
            promise.then(function (r) {
                response = r;
            });

            $rootScope.$digest();

            expect(response instanceof UserModel).toBe(true);
            expect(response.id).toEqual(5);
            expect(response.title).toEqual('User title');
        });

        it('should handle rejects', function() {
            $httpBackend.expectGET(UserModel.$urlBase + '/5').respond(404, 'No such thang!');

            var promise = UserRepository.getById(5),
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
            $httpBackend.expectGET(UserModel.$urlBase).respond(200, [{id: 5, title:'User title'},{id: 6, title:'User title'}]);

            var promise = UserRepository.getAll();

            var User5, User6;
            promise.then(function (r) {
                User5 = r[0];
                User6 = r[1];
            });

            $httpBackend.flush();

            expect(User5 instanceof UserModel).toBe(true);
            expect(User5.id).toEqual(5);
            expect(User5.title).toEqual('User title');

            expect(User6 instanceof UserModel).toBe(true);
            expect(User6.id).toEqual(6);
            expect(User6.title).toEqual('User title');
        });

        it('should handle rejects', function() {
            $httpBackend.expectGET(UserModel.$urlBase).respond(404, 'No such thang!');

            var promise = UserRepository.getAll(5),
                success = jasmine.createSpy('success'),
                error = jasmine.createSpy('error');

            promise.then(success).catch(error);

            $httpBackend.flush();

            expect(success).not.toHaveBeenCalled();
            expect(error).toHaveBeenCalled();
        });
    });

    describe('attach', function () {

        var UserModel;

        beforeEach(function () {
            inject(function (_UserModel_) {
                UserModel = _UserModel_;
            });
        });

        it('should throw if trying to attach a model that is not of valid type', function() {
            function wrapper() {
                UserRepository.attach({fails: true});
            }
            expect(wrapper).toThrow();
        });

        it('should return the attached model on subsequent requests', function() {

            UserRepository.attach(new UserModel({id: 5, title:'User title'}));

            var User;

            UserRepository.getById(5).then(function (response) {
                User = response;
            });

            $rootScope.$digest();

            expect(User instanceof UserModel).toBe(true);
            expect(User.id).toEqual(5);
            expect(User.title).toEqual('User title');
        });
    });

    describe('create', function () {
        it('should return a newed up instance of the User Model', function() {
            var User = UserRepository.create({title:'New title'});
            expect(User instanceof UserModel).toBe(true);
            expect(User.title).toEqual('New title');
        });
    });

    describe('_pool', function () {
        it('should return a reference to the pool', function() {
            var newUser = {id:19, title:'Yeah!'};
            UserRepository._pool[19] = newUser;

            var User;
            UserRepository.getById(19).then(function (response) {
                User = response;
            });
            $rootScope.$digest();

            expect(User).toBe(newUser);
        });
    });

    describe('saveChanges', function () {
       it('should save all changes in current Repository to the server');
    });
});