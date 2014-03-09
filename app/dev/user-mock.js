angular.module('ndc')
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid) {
        if(!Config.API.useMocks) return;

        var collectionUrl = APIBaseUrl + 'users';
        var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);

        $log.log('Overriding all calls to `' + collectionUrl + '` with mocks defined in *dev/user-mocks.js*');
        $log.log('*******************************************************************************************************************************************************');

        var UserRepo = {};
        UserRepo.data = [
            {
                id: 1,
                userName:'Ali',
                favourites:[
                    {id: 1, title: 'In The Open: Ellie Goulding - Guns And Horses', description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how it would translate acoustically since most of the album is more electronic driven.Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.', duration: 1234, videoId: 23919731, type:'vimeo'},
                    {id: 2, title: 'Tootys Wedding', description: 'Some long description about a movie and stuff', duration: 1234, videoId: 25799594, type:'vimeo'}
                ],
                permissions: [
                ],
                verified: true,
                roles: [
                    'administrator'
                ]
            }
        ];
        UserRepo.index = {};

        angular.forEach(UserRepo.data, function(item, key) {
            UserRepo.index[item.id] = item;
        });

        //GET users/
        $httpBackend.whenGET(collectionUrl).respond(function(method, url, data, headers) {
            $log.debug('Intercepted GET to `' + collectionUrl + '`', data);
            return [200, UserRepo.data, {/*headers*/}];
        });

        //POST users/
        $httpBackend.whenPOST(collectionUrl).respond(function(method, url, data, headers) {
            $log.debug('Intercepted POST to `' + collectionUrl + '`', data);
            var User = angular.fromJson(data);

            User.id = guid();
            UserRepo.data.push(User);
            UserRepo.index[User.id] = User;

            return [200, User, {/*headers*/}];
        });

        //GET users/id
        $httpBackend.whenGET( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.debug('Intercepted GET to `' + collectionUrl + '`');
            var id = url.match( new RegExp(IdRegExp) )[0];
            return [UserRepo.index[id]?200:404, UserRepo.index[id] || null, {/*headers*/}];
        });

        //PUT users/id
        $httpBackend.whenPUT( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.debug('Intercepted PUT to `' + collectionUrl + '`');
            var id = url.match( new RegExp(IdRegExp) )[0];

            if (!UserRepo.index[id]) {
                return [404, {} , {/*headers*/}];
            }

            var User = UserRepo.index[id] = angular.fromJson(data);

            return [200, User, {/*headers*/}];
        });

        //DELETE users/id
        $httpBackend.whenDELETE( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.debug('Intercepted DELETE to `' + collectionUrl + '`');
            var id = url.match( new RegExp(IdRegExp) )[0];

            var User = UserRepo.index[id];
            if (!User) {
                return [404, {} , {/*headers*/}];
            }
            delete UserRepo.index[User.id];
            var index = UserRepo.data.indexOf(User);
            UserRepo.data.splice(index, 1);
            return [200, User , {/*headers*/}];
        });

    });

