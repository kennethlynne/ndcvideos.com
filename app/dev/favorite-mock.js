angular.module('ndc')
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid) {
        if(!Config.API.useMocks) return;

        var collectionUrl = APIBaseUrl + 'favorites';
        var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);

        var userIdRexEx = new RegExp(regexEscape(collectionUrl + '/') + IdRegExp );
        var userIdFavIdRegEx = new RegExp(regexEscape(collectionUrl + '/') + IdRegExp + regexEscape('/') + IdRegExp);

        $log.log('***************************************************************************************************************');
        $log.log('Overriding all calls to `' + collectionUrl + '` with mocks defined in *dev/favorite-mocks.js*');
        $log.log('***************************************************************************************************************');

        var FavoriteRepo = {};
        FavoriteRepo.data = [
            {
                id: 1,
                favourites:[
                    {
                        id: 1,
                        title: 'In The Open: Ellie Goulding - Guns And Horses',
                        description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how it would translate acoustically since most of the album is more electronic driven.Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.',
                        uration: 1234,
                        videoId: 23919731,
                        type:'vimeo'
                    },
                    {
                        id: 2,
                        title: 'Tootys Wedding',
                        description: 'Some long description about a movie and stuff',
                        duration: 1234,
                        videoId: 25799594,
                        type:'vimeo'
                    }
                ]
            },
        ];
        FavoriteRepo.index = {};

        angular.forEach(FavoriteRepo.data, function(item, key) {
            FavoriteRepo.index[item.id] = item;
        });

        //POST favorites/id
        $httpBackend.whenPOST( userIdRexEx ).respond(function(method, url, data, headers) {
            $log.debug('Intercepted POST to `' + url + '`', data);
            var Favorite = angular.fromJson(data);
            Favorite.id = guid();

            FavoriteRepo.data[userId] = FavoriteRepo.data[userId] || {};

            FavoriteRepo.data[userId].favourites = FavoriteRepo.data[userId].favourites || [];
            FavoriteRepo.data[userId].favourites.push(Favorite);

            FavoriteRepo.index[userId] = Favorite;

            return [200, Favorite, {/*headers*/}];
        });

        //GET favorites/<userId>
        $httpBackend.whenGET( userIdRexEx ).respond(function(method, url, data, headers) {
            $log.debug('Intercepted GET to `' + url + '`');
            var id = url.match( new RegExp(IdRegExp) )[0];
            return [FavoriteRepo.index[id]?200:404, FavoriteRepo.index[id]?FavoriteRepo.index[id].favourites : null, {/*headers*/}];
        });

        //PUT favorites/<userId>/<id>
        $httpBackend.whenPUT( userIdFavIdRegEx ).respond(function(method, url, data, headers) {
            $log.debug('Intercepted PUT to `' + url + '`');
            var id = url.match( new RegExp(IdRegExp) )[0];

            if (!FavoriteRepo.index[id]) {
                return [404, {} , {/*headers*/}];
            }

            var Favorite = FavoriteRepo.index[id] = angular.fromJson(data);

            return [200, Favorite, {/*headers*/}];
        });

        //DELETE favorites/<userId>/<id>
        $httpBackend.whenDELETE( userIdFavIdRegEx ).respond(function(method, url, data, headers) {
            $log.debug('Intercepted DELETE to `' + url + '`');
            var id = url.match( new RegExp(IdRegExp) )[0];

            var Favorite = FavoriteRepo.index[id];
            if (!Favorite) {
                return [404, {} , {/*headers*/}];
            }
            delete FavoriteRepo.index[Favorite.id];
            var index = FavoriteRepo.data.indexOf(Favorite);
            FavoriteRepo.data.splice(index, 1);
            return [200, Favorite , {/*headers*/}];
        });

    });


