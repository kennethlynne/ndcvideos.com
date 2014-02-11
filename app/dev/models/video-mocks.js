angular.module('ndc')
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid) {

        //Only load mocks if config says so
        if(!Config.useMocks) return;

        var collectionUrl = APIBaseUrl + 'video';
        var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);

        console.log('Stubbing video API - ' + collectionUrl);
        console.log('************');


        var VideoRepo = {};
        VideoRepo.data = [
            {id: 1, title: 'In The Open: Ellie Goulding - Guns And Horses', description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how it would translate acoustically since most of the album is more electronic driven. After a long drive from Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.', duration: 1234, videoId: 23919731, type:'vimeo'},
            {id: 2, title: 'Titl2e', description: 'desc', duration: 12324, videoId: "8NNSXiLNKkM", type:'youtube'},
            {id: 3, title: 'Title3', description: 'desc', duration: 123224, videoId: 1123, type:'vimeo'},
            {id: 4, title: 'Titl2e', description: 'desc', duration: 121324, videoId: 12123, type:'vimeo'}

        ];
        VideoRepo.index = {};

        angular.forEach(VideoRepo.data, function(item, key) {
            VideoRepo.index[item.id] = item; //Index messages to be able to do efficient lookups on id
        });

        function assertLoggedIn(headers) {
            if (headers["Accept"] == "application/json, text/plain, */*" && headers["Authorization"] == "take-on-me") {
                return true;
            }
            $log.error('Not authorized.');
            return false;
        }

        //GET video/ should return a list og messages
        $httpBackend.whenGET(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to video', data);

            if (!assertLoggedIn(headers)) {
                return [403, {message: 'Not authorized'}];
            }

            return [200, VideoRepo.data, {/*headers*/}];
        });

        //POST video/ should save a message and return the message with an id
        $httpBackend.whenPOST(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted POST to video', data);

            if (!assertLoggedIn(headers)) {
                return [403, {message: 'Not authorized'}];
            }

            var Video = angular.fromJson(data);

            Video.id = guid();
            VideoRepo.data.push(Video);
            VideoRepo.index[Video.id] = Video;

            return [200, Video, {/*headers*/}];
        });

        //GET video/id should return a message
        $httpBackend.whenGET( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to video');

            if (!assertLoggedIn(headers)) {
                return [403, {message: 'Not authorized'}];
            }

            var id = url.match( new RegExp(IdRegExp) )[0];
            return [VideoRepo.index[id]?200:403, VideoRepo.index[id] || null, {/*headers*/}];
        });

    });


