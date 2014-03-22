angular.module('ndc')
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid) {
        if (!Config.API.useMocks) return;

        var collectionUrl = APIBaseUrl + 'videos';
        var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);
        var QueryRegExp = /[\d\w-_\.\s,]*$/.toString().slice(1, -1);

        $log.log('***************************************************************************************************************');
        $log.log('Overriding all calls to `' + collectionUrl + '` with mocks defined in *dev/video-mock.js*');
        $log.log('***************************************************************************************************************');

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
                title: "Dan Wahlin at ng-conf: John Lindquist from Egghead.io",
                description: "Dan Wahlin's Web Weekly chats to John Lindquist from egghead.io and JetBrains about his Angular training videos.  The video was recorded at ng-conf, the world's first AngularJS conference, held in Salt Lake City 16th-17th January 2014.",
                duration: 3216,
                videoId: 85012130,
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
                thumbnail_small: "http://b.vimeocdn.com/ts/462/106/462106710_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/462/106/462106710_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/462/106/462106710_640.jpg"
            },

            {
                id: 3,
                title: "Angular Bootcamp Video Scrapbook - Salt Lake City, 16th January 2014",
                description: "Short video scrapbook of footage shot at the pre-conference workshop at the world's first worldwide AngularJS conference",
                duration: 123224,
                videoId: 84285950,
                type: 'vimeo',
                tags: [
                    {
                        title: 'angular'
                    },
                    {
                        title:'bootcamp'
                    },
                    {
                        title:'javascript'
                    }
                ],
                thumbnail_small: "http://b.vimeocdn.com/ts/461/087/461087855_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/461/087/461087855_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/461/087/461087855_640.jpg"
            },

            {
                id: 4,
                title: "Machine Learning for Java Developers - it’s not just the algorithms",
                description: "Learn how to build and run a system that gets smarter over time by learning from data. If you already took a class in machine learning this talk will show you how to translate those skills into a working system. If you don’t know any machine learning you will get a gentle introduction and gain a better understanding for how the data-driven sausage is made.",
                duration: 121324,
                videoId: 74713139,
                tags: [
                    {
                        title: 'data'
                    },
                    {
                        title:'java'
                    },
                    {
                        title:'machine learning'
                    }
                ],
                type: 'vimeo',
                thumbnail_small: "http://b.vimeocdn.com/ts/449/150/449150990_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/449/150/449150990_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/449/150/449150990_640.jpg"

            },
            {
                id:5,
                videoId: 74713138,
                tags: [
                    {
                        title: 'data'
                    },
                    {
                        title:'Hadoop'
                    },
                    {
                        title:'Data'
                    }
                ],
                title: "High Speed Continuous & Reliable Data Ingest into Hadoop",
                description: "10M events per second into HDFS, Under a sec query per 20GB of HDFS data. . . All of this and more will be demonstrated live during this talk",
                thumbnail_small: "http://b.vimeocdn.com/ts/449/147/449147320_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/449/147/449147320_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/449/147/449147320_640.jpg",
                duration: 3826,
                type:'vimeo'
            },
            {
                id: 6,
                title: "Hva har Tetris til felles med kompleksitet?",
                description: "Tetris er et klassiskt spill hvor mye av utfordringen ligger i å holde kompleksiteten nede. For å lykkes med det, kan det være lurt å tenke litt fremover, og ikke bare neste brikke. Noen ganger kan det også være lurt å ta en pause, for å ta tilbake kontrollen. Mye av dette kan også relateres til softwareutvikling.",
                videoId:74401305,
                thumbnail_small: "http://b.vimeocdn.com/ts/448/750/448750980_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/448/750/448750980_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/448/750/448750980_640.jpg",
                duration:529,
                tags: [
                    {
                        title: 'Tetris'
                    },
                    {
                        title:'kompleksitet'
                    },
                    {
                        title:'spill'
                    }
                ],
                type:'vimeo'
            },
            {
                id: 7,
                title: "Improving Your Workflow with Yeoman by Brian Ford",
                description: "Improving Your Workflow with Yeoman by Brian Ford gives a look at one of the hottest tools for front-end development, taken from Web Rebels 2013",
                videoId:76233618,
                thumbnail_small: "http://b.vimeocdn.com/ts/450/990/450990105_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/450/990/450990105_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/450/990/450990105_640.jpg",
                duration:529,
                tags: [
                    {
                        title: 'Yeoman'
                    },
                    {
                        title:'Workflow'
                    },
                    {
                        title:'Front end'
                    }
                ],
                type:'vimeo'
            },
            {
                id: 76319933,
                videoId: 76319933,
                title: "Streams, Events, and Data by Dominic Tarr",
                description: "Streams, Events, and Data",
                thumbnail_small: "http://b.vimeocdn.com/ts/451/080/451080642_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/451/080/451080642_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/451/080/451080642_640.jpg",
                duration: 2204,
                tags: [
                    {
                        title: 'Streams'
                    },
                    {
                        title:'Events'
                    },
                    {
                        title:'Data'
                    }
                ],
                type:'vimeo'
            },
            {
                id: 76165652,
                videoId:76165652,
                title: "The State of WebRTC by Rob Hawkes",
                description: "The State of WebRTC by Rob Hawkes at Web Rebels 2013, WebRTC brings peer-to-peer networking to the browser. But what is it? How does it work? How do you use it? And what are others doing with it? In this talk, Rob covers the current state of WebRTC, outlines how to use it, and shows off some of the amazing things that it can do beyond video chat.",
                url: "http://vimeo.com/76165652",
                thumbnail_small: "http://b.vimeocdn.com/ts/450/901/450901838_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/450/901/450901838_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/450/901/450901838_640.jpg",
                duration: 2620,
                tags: [
                    {
                        title: 'Webrtc'
                    },
                    {
                        title:'Network'
                    },
                    {
                        title:'Data'
                    }
                ],
                type:'vimeo'
        }
        ];
        VideoRepo.index = {};


        angular.forEach(VideoRepo.data, function (item, key) {
            VideoRepo.index[item.id] = item;
        });


        //GET video/
        $httpBackend.whenGET(collectionUrl).respond(function (method, url, data, headers) {
            $log.log('Intercepted GET to `' + url + '`', data);
            return [200, VideoRepo.data, {/*headers*/}];
        });

        //POST videos/
        $httpBackend.whenPOST(collectionUrl).respond(function (method, url, data, headers) {
            $log.log('Intercepted POST to `' + url + '`', data);
            var Video = angular.fromJson(data);

            Video.id = guid();
            VideoRepo.data.push(Video);
            VideoRepo.index[Video.id] = Video;

            return [200, Video, {/*headers*/}];
        });

        //GET videos/id
        $httpBackend.whenGET(new RegExp(regexEscape(collectionUrl + '/') + IdRegExp)).respond(function (method, url, data, headers) {
            $log.log('Intercepted GET to `' + url + '`');
            var id = url.match(new RegExp(IdRegExp))[0];
            return [VideoRepo.index[id] ? 200 : 404, VideoRepo.index[id] || null, {/*headers*/}];
        });

        //GET videos/search?tags=<tags>
        $httpBackend.whenGET(new RegExp(regexEscape(collectionUrl + '/search?tags=') + QueryRegExp)).respond(function (method, url, data, headers) {
            $log.log('Intercepted GET to `' + url + '`');
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


        //GET videos/search?q=<query>
        $httpBackend.whenGET(new RegExp(regexEscape(collectionUrl + '/search?q=') + QueryRegExp)).respond(function (method, url, data, headers) {
            $log.log('Intercepted GET to `' + url + '`');
            var query = url.match(new RegExp(QueryRegExp))[0];

            query = query.toLowerCase();

            var queryArray = query.split(' ');

            var videos = _.filter(VideoRepo.data, function (item) {

                var videoTags = _.pluck(item.tags, 'title');

                return _.every(queryArray, function (q) {
                    console.log(videoTags);

                    for(var i = 0;i < videoTags.length;i++)
                    {
                        if(videoTags[i].toLowerCase().indexOf(q) > -1)
                            return true;
                    }

                }) || item.title.toLowerCase().indexOf(query) > -1;

                //Find videos where query matches title, or tags.

               //Checking if title matches

//                return ;

//                return _.some(query, function(q){
//
//                    return item.title.toLowerCase().indexOf(q) > -1//;
//
//
//                });




            });
            console.log(videos);


            return [200, videos, {/*headers*/}];
        });


        //PUT videos/id
        $httpBackend.whenPUT(new RegExp(regexEscape(collectionUrl + '/') + IdRegExp)).respond(function (method, url, data, headers) {
            $log.log('Intercepted PUT to `' + url + '`');
            var id = url.match(new RegExp(IdRegExp))[0];

            if (!VideoRepo.index[id]) {
                return [404, {} , {/*headers*/}];
            }

            var Video = VideoRepo.index[id] = angular.fromJson(data);

            return [200, Video, {/*headers*/}];
        });

        //DELETE videos/id
        $httpBackend.whenDELETE(new RegExp(regexEscape(collectionUrl + '/') + IdRegExp)).respond(function (method, url, data, headers) {
            $log.log('Intercepted DELETE to `' + url + '`');
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


