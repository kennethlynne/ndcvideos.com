angular.module('ndc')
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid) {

        //Only load mocks if config says so
        if(!Config.useMocks) return;

        var collectionUrl = APIBaseUrl + 'video';
        var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);

        console.log('Stubbing video API - ' + collectionUrl);
        console.log('************');

        var VideoRepo = {};
        VideoRepo.data = [{id: guid(), text:'Hello World'}];
        VideoRepo.index = {};

        angular.forEach(VideoRepo.data, function(item, key) {
            VideoRepo.index[item.id] = item; //Index messages to be able to do efficient lookups on id
        });

        //GET video/ should return a list og messages
        $httpBackend.whenGET(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to video', data);
            return [200, VideoRepo.data, {/*headers*/}];
        });

        //POST video/ should save a message and return the message with an id
        $httpBackend.whenPOST(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted POST to video', data);
            var Video = angular.fromJson(data);

            Video.id = guid();
            VideoRepo.data.push(Video);
            VideoRepo.index[Video.id] = Video;

            return [200, Video, {/*headers*/}];
        });

        //GET video/id should return a message
        $httpBackend.whenGET( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to video');
            var id = url.match( new RegExp(IdRegExp) )[0];
            return [200, VideoRepo.index[id] || null, {/*headers*/}];
        });

    });


