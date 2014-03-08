angular.module('ndc')
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid) {
        if (!Config.API.useMocks) return;

        var collectionUrl = APIBaseUrl + 'videos';
        var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);
        var QueryRegExp = /[\d\w-_\.\s,]*$/.toString().slice(1, -1);

        console.log('Stubbing video API - ' + collectionUrl);
        console.log('************');

        var VideoRepo = {};
        VideoRepo.data = [
            {
                id: 1,
                title: 'NDCOslo Trailer',
                description: 'A festival for developers! Oslo Spektrum, Norway 2-6 June 2014',
                duration: 134,
                videoId: 86603468,
                type: 'vimeo',
                tags: [
                    {
                        title: '.NET'
                    },
                    {
                        title: 'Javascript'
                    }
                ],
                upload_date: "2014-02-13 08:04:18",
                thumbnail_small: "http://b.vimeocdn.com/ts/464/338/464338254_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/464/338/464338254_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/464/338/464338254_640.jpg"
            },

            {
                id: 2,
                title: 'Keynote with Dan North - Jackstones: the Journey to Mastery',
                description: "It takes time to become really good at something. Time, commitment and a genuine passion. If you're not having fun the learning is a chore, if you are then it hardly feels like learning at all, at least not like the thing they made you do in school. Craftsmanship is about making that commitment and then figuring out how to see it through. Using examples of mastery from various fields and a thirty year paper-folding habit, Dan describes some of the many facets of craftsmanship and tries to figure out exactly what the craft is that we programmers do.",
                duration: 3216,
                videoId: 86396740,
                type: 'vimeo',
                tags: [
                    {
                        title: 'Angular'
                    },
                    {
                        title: 'Javascript'
                    }
                ],
                upload_date: "2014-02-11 04:25:00",
                thumbnail_small: "http://b.vimeocdn.com/ts/464/052/464052168_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/464/052/464052168_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/464/052/464052168_640.jpg"
            },

            {
                id: 3,
                title: 'Visitor pattern in Ruby',
                description: 'Explaining the Visitor pattern in  Ruby',
                duration: 123224,
                videoId: 85096027,
                type: 'vimeo',
                tags: [
                    {
                        title: 'guns'
                    }
                ]
            },

            {
                id: 4,
                title: 'Ruby 2.0',
                description: 'First look at prepending a module.',
                duration: 121324,
                videoId: 60572321,
                type: 'vimeo'}
        ];
        VideoRepo.index = {};


        angular.forEach(VideoRepo.data, function (item, key) {
            VideoRepo.index[item.id] = item;
        });


        //GET video/
        $httpBackend.whenGET(collectionUrl).respond(function (method, url, data, headers) {
            $log.log('Intercepted GET to video', data);
            return [200, VideoRepo.data, {/*headers*/}];
        });

        //POST videos/
        $httpBackend.whenPOST(collectionUrl).respond(function (method, url, data, headers) {
            $log.log('Intercepted POST to video', data);
            var Video = angular.fromJson(data);

            Video.id = guid();
            VideoRepo.data.push(Video);
            VideoRepo.index[Video.id] = Video;

            return [200, Video, {/*headers*/}];
        });

        //GET videos/id
        $httpBackend.whenGET(new RegExp(regexEscape(collectionUrl + '/') + IdRegExp)).respond(function (method, url, data, headers) {
            $log.log('Intercepted GET to video');
            var id = url.match(new RegExp(IdRegExp))[0];
            return [VideoRepo.index[id] ? 200 : 404, VideoRepo.index[id] || null, {/*headers*/}];
        });

        //GET videos/search?tags=<tags>
        $httpBackend.whenGET(new RegExp(regexEscape(collectionUrl + '/search?tags=') + QueryRegExp)).respond(function (method, url, data, headers) {
            $log.log('Intercepted GET to video');
            var query = url.match(new RegExp(QueryRegExp))[0];

            var tags = query.split(',');

            var videos = _.filter(VideoRepo.data, function (item) {
                var videoTags = _.pluck(item.tags, 'title');
                return _.every(tags, function (tag) {
                    return _.contains(videoTags, tag);
                })
            });

            return [200, videos, {/*headers*/}];
        });

        //PUT videos/id
        $httpBackend.whenPUT(new RegExp(regexEscape(collectionUrl + '/') + IdRegExp)).respond(function (method, url, data, headers) {
            $log.log('Intercepted PUT to video');
            var id = url.match(new RegExp(IdRegExp))[0];

            if (!VideoRepo.index[id]) {
                return [404, {} , {/*headers*/}];
            }

            var Video = VideoRepo.index[id] = angular.fromJson(data);

            return [200, Video, {/*headers*/}];
        });

        //DELETE videos/id
        $httpBackend.whenDELETE(new RegExp(regexEscape(collectionUrl + '/') + IdRegExp)).respond(function (method, url, data, headers) {
            $log.log('Intercepted DELETE to video');
            var id = url.match(new RegExp(IdRegExp))[0];

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


