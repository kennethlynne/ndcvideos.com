angular.module('ndc')
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid) {

        //Only load mocks if config says so
        if(!Config.API.useMocks)
            return;

        var collectionUrl = APIBaseUrl + 'user';

        var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);

        console.log('Stubbing user API - ' + collectionUrl);
        console.log('************');

        var UserRepo = {};
        UserRepo.data = [
            {
                id: 1,
                userName:'Ali',
                favourites:[
                    {id: 1, title: 'In The Open: Ellie Goulding - Guns And Horses', description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how it would translate acoustically since most of the album is more electronic driven.Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.', duration: 1234, videoId: 23919731, type:'vimeo'},
                    {id: 2, title: 'Tootys Wedding', description: 'Some long description about a movie and stuff', duration: 1234, videoId: 25799594, type:'vimeo'}
                ]
            }
        ];
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


