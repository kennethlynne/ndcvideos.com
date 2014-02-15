angular.module('ndc')
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid) {

        //Only load mocks if config says so
        if(!Config.useMocks) return;

        var collectionUrl = APIBaseUrl + 'user';
        var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);

        console.log('Stubbing user API - ' + collectionUrl);
        console.log('************');

        var UserRepo = {};
        UserRepo.data = [{id: guid(), text:'Hello World'}];
        UserRepo.index = {};

        angular.forEach(UserRepo.data, function(item, key) {
            UserRepo.index[item.id] = item; //Index messages to be able to do efficient lookups on id
        });

        //GET user/ should return a list og messages
        $httpBackend.whenGET(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to user', data);
            return [200, UserRepo.data, {/*headers*/}];
        });

        //POST user/ should save a message and return the message with an id
        $httpBackend.whenPOST(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted POST to user', data);
            var User = angular.fromJson(data);

            User.id = guid();
            UserRepo.data.push(User);
            UserRepo.index[User.id] = User;

            return [200, User, {/*headers*/}];
        });

        //GET user/id should return a message
        $httpBackend.whenGET( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to user');
            var id = url.match( new RegExp(IdRegExp) )[0];
            return [200, UserRepo.index[id] || null, {/*headers*/}];
        });

    });


