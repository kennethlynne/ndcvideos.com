angular.module('ndc')
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid) {
        if(!Config.API.useMocks) return;

        var collectionUrl = APIBaseUrl + 'video';
        var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);

        console.log('Stubbing video API - ' + collectionUrl);
        console.log('************');

        var VideoRepo = {};
        VideoRepo.data = [
            {id: 1, title: 'Title', description: 'desc', duration: 1234, vimeoId: 123},
            {id: 2, title: 'Titl2e', description: 'desc', duration: 12324, vimeoId: 12223},
            {id: 3, title: 'Title3', description: 'desc', duration: 123224, vimeoId: 1123},
            {id: 4, title: 'Titl2e', description: 'desc', duration: 121324, vimeoId: 12123}
        ];
        VideoRepo.index = {};

        angular.forEach(VideoRepo.data, function(item, key) {
            VideoRepo.index[item.id] = item;
        });

        //GET video/
        $httpBackend.whenGET(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to video', data);
            return [200, VideoRepo.data, {/*headers*/}];
        });

        //POST video/
        $httpBackend.whenPOST(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted POST to video', data);
            var Video = angular.fromJson(data);

            Video.id = guid();
            VideoRepo.data.push(Video);
            VideoRepo.index[Video.id] = Video;

            return [200, Video, {/*headers*/}];
        });

        //GET video/id
        $httpBackend.whenGET( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to video');
            var id = url.match( new RegExp(IdRegExp) )[0];
            return [VideoRepo.index[id]?200:404, VideoRepo.index[id] || null, {/*headers*/}];
        });

        //PUT video/id
        $httpBackend.whenPUT( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted PUT to video');
            var id = url.match( new RegExp(IdRegExp) )[0];

            if (!VideoRepo.index[id]) {
                return [404, {} , {/*headers*/}];
            }

            var Video = VideoRepo.index[id] = angular.fromJson(data);

            return [200, Video, {/*headers*/}];
        });

        //DELETE video/id
        $httpBackend.whenDELETE( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted DELETE to video');
            var id = url.match( new RegExp(IdRegExp) )[0];

            var Video = VideoRepo.index[id];
            if (!Video) {
                return [404, {} , {/*headers*/}];
            }
            delete VideoRepo.index[Video.id];
            var index = VideoRepo.data.indexOf(Video);
            VideoRepo.data.splice(index, 1);
            return [200, Video , {/*headers*/}];
        });

    });


