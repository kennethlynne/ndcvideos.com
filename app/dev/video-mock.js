angular.module('ndc')
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid, _) {
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
                        text: '.NET'
                    },
                    {
                        text: 'Javascript'
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
                        text: 'Angular'
                    },
                    {
                        text: 'Javascript'
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
                        text: 'angular'
                    },
                    {
                        text: 'bootcamp'
                    },
                    {
                        text: 'javascript'
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
                        text: 'data'
                    },
                    {
                        text: 'java'
                    },
                    {
                        text: 'machine learning'
                    }
                ],
                type: 'vimeo',
                thumbnail_small: "http://b.vimeocdn.com/ts/449/150/449150990_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/449/150/449150990_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/449/150/449150990_640.jpg"

            },
            {
                id: 5,
                videoId: 74713138,
                tags: [
                    {
                        text: 'data'
                    },
                    {
                        text: 'Hadoop'
                    },
                    {
                        text: 'Data'
                    }
                ],
                title: "High Speed Continuous & Reliable Data Ingest into Hadoop",
                description: "10M events per second into HDFS, Under a sec query per 20GB of HDFS data. . . All of this and more will be demonstrated live during this talk",
                thumbnail_small: "http://b.vimeocdn.com/ts/449/147/449147320_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/449/147/449147320_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/449/147/449147320_640.jpg",
                duration: 3826,
                type: 'vimeo'
            },
            {
                id: 6,
                title: "Hva har Tetris til felles med kompleksitet?",
                description: "Tetris er et klassiskt spill hvor mye av utfordringen ligger i å holde kompleksiteten nede. For å lykkes med det, kan det være lurt å tenke litt fremover, og ikke bare neste brikke. Noen ganger kan det også være lurt å ta en pause, for å ta tilbake kontrollen. Mye av dette kan også relateres til softwareutvikling.",
                videoId: 74401305,
                thumbnail_small: "http://b.vimeocdn.com/ts/448/750/448750980_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/448/750/448750980_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/448/750/448750980_640.jpg",
                duration: 529,
                tags: [
                    {
                        text: 'Tetris'
                    },
                    {
                        text: 'kompleksitet'
                    },
                    {
                        text: 'spill'
                    }
                ],
                type: 'vimeo'
            },
            {
                id: 7,
                title: "Improving Your Workflow with Yeoman by Brian Ford",
                description: "Improving Your Workflow with Yeoman by Brian Ford gives a look at one of the hottest tools for front-end development, taken from Web Rebels 2013",
                videoId: 76233618,
                thumbnail_small: "http://b.vimeocdn.com/ts/450/990/450990105_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/450/990/450990105_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/450/990/450990105_640.jpg",
                duration: 529,
                tags: [
                    {
                        text: 'Yeoman'
                    },
                    {
                        text: 'Workflow'
                    },
                    {
                        text: 'Front end'
                    }
                ],
                type: 'vimeo'
            },
            {
                id: 8,
                videoId: 76319933,
                title: "Streams, Events, and Data by Dominic Tarr",
                description: "Streams, Events, and Data",
                thumbnail_small: "http://b.vimeocdn.com/ts/451/080/451080642_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/451/080/451080642_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/451/080/451080642_640.jpg",
                duration: 2204,
                tags: [
                    {
                        text: 'Streams'
                    },
                    {
                        text: 'Events'
                    },
                    {
                        text: 'Data'
                    }
                ],
                type: 'vimeo'
            },
            {
                id: 9,
                videoId: 76165652,
                title: "The State of WebRTC by Rob Hawkes",
                description: "The State of WebRTC by Rob Hawkes at Web Rebels 2013, WebRTC brings peer-to-peer networking to the browser. But what is it? How does it work? How do you use it? And what are others doing with it? In this talk, Rob covers the current state of WebRTC, outlines how to use it, and shows off some of the amazing things that it can do beyond video chat.",
                url: "http://vimeo.com/76165652",
                thumbnail_small: "http://b.vimeocdn.com/ts/450/901/450901838_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/450/901/450901838_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/450/901/450901838_640.jpg",
                duration: 2620,
                tags: [
                    {
                        text: 'Webrtc'
                    },
                    {
                        text: 'Network'
                    },
                    {
                        text: 'Data'
                    }
                ],
                type: 'vimeo'
            },
            {

                id: 10,
                videoId: 76153146,
                title: "Gone in 60 frames per second by Addy Osmani",
                description: "Gone in 60 frames per second by Addy Osmani, from Web Rebels 2013. What’s stopping your web pages from getting silky smooth scrolling, buttery animation and a user experience that’s snappy and fast? Jank-free rendering performance has been shown to positively affect user engagement and experience in many large sites, but remains an area many are unaware of how to diagnose or optimize.",
                url: "http://vimeo.com/76153146",
                upload_date: "2013-10-04 11:30:30",
                thumbnail_small: "http://b.vimeocdn.com/ts/450/883/450883989_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/450/883/450883989_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/450/883/450883989_640.jpg",
                duration: 2828,
                tags: [
                    {
                        text: 'Chrome'
                    },
                    {
                        text: 'Front end'
                    },
                    {
                        text: 'Google'
                    }
                ],
                type: 'vimeo'
            },
            {
                id: 11,
                videoId: 43336762,
                title: "Jake Archibald - Application Cache Douchebag",
                description: "This video was filmed during The Web Rebels conference which took place on the 24-25th of May 2012 in Oslo, Norway. It is a non-profit conference for everyone who loves programming applications and services using web technology.",
                upload_date: "2012-06-03 07:48:22",
                mobile_url: "http://vimeo.com/m/43336762",
                thumbnail_small: "http://b.vimeocdn.com/ts/300/849/300849345_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/300/849/300849345_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/300/849/300849345_640.jpg",
                duration: 2389,
                tags: [
                    {
                        text: 'Cache'
                    },
                    {
                        text: 'Front end'
                    },
                    {
                        text: 'Web'
                    }
                ],
                type: 'vimeo'
            },
            {
                id: 12,
                videoId: 76159530,
                title: "What Every Hipster Should Know About Functional Programming by Bodil Stokke",
                description: "Different programming paradigms serve different purposes. Systems programmers prefer tools that are dumb, imperative and close to the metal. Enterprise programmers prefer tools which foster complexity, increasing billable hours and the client's dependency on the developer.",
                upload_date: "2013-10-04 12:44:51",
                thumbnail_small: "http://b.vimeocdn.com/ts/450/892/450892975_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/450/892/450892975_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/450/892/450892975_640.jpg",
                duration: 2595,
                tags: [
                    {
                        text: 'Hipster'
                    },
                    {
                        text: 'Functional programming'
                    },
                    {
                        text: 'Web'
                    }
                ],
                type: 'vimeo'
            },
            {
                id: 13,
                videoId: 76141334,
                title: "I have a good feeling about this - Why tooling is poised to make the jump to hyperspace by Reginald Braithwaite",
                description: "The opening keynote was held by the amazing Reginald Braithwaite for Web Rebels 2013.",
                thumbnail_small: "http://b.vimeocdn.com/ts/450/875/450875534_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/450/875/450875534_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/450/875/450875534_640.jpg",
                duration: 2595,
                tags: [
                    {
                        text: 'Hipster'
                    },
                    {
                        text: 'Functional programming'
                    },
                    {
                        text: 'Web'
                    }
                ],
                type: 'vimeo'
            },
            {
                id: 14,
                videoId: 76146296,
                title: "AngularJS: teaching browsers new tricks by Pawel Kozlowski",
                description: "Pawel Kozlowski from the AngularJS team held this talk at Web Rebels 2013",
                upload_date: "2013-10-04 10:08:35",
                thumbnail_small: "http://b.vimeocdn.com/ts/450/893/450893300_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/450/893/450893300_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/450/893/450893300_640.jpg",
                duration: 2254,
                tags: [
                    {
                        text: 'AngularJS'
                    },
                    {
                        text: 'Browser'
                    },
                    {
                        text: 'Web'
                    }
                ],
                type: 'vimeo'
            },
            {
                id: 15,
                videoId: 25606006,
                title: "TXJS 2011 A1 - Douglas Crockford - JavaScript Programming Style and Your Brain",
                description: "Computer programs are the most complicated stuff that people make. Computer programs must be perfect, and people are not good at that. JavaScript is one of our least perfect programming languages. But there are positive things that can reduce your error rate and enhance your beauty. This was the first talk on the A track of TXJS 2011. Visit http://2011.texasjavascript.com for more.",
                thumbnail_small: "http://b.vimeocdn.com/ts/168/711/168711859_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/168/711/168711859_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/168/711/168711859_640.jpg",
                duration: 2543,
                tags: [
                    {
                        text: 'Javascript'
                    },
                    {
                        text: 'web'
                    },
                    {
                        text: 'programming style'
                    }
                ],
                type: 'vimeo'
            },
            {
                id: 16,
                videoId: 25698808,
                title: "TXJS 2011 B1 - Adam J. Sontag - Fixing These jQuery: A Guide To Debugging",
                description: "The road to jQuery success is paved with the guts of bugs slain along the way. At “Fixing These jQuery”, you’ll understand how to approach your jQuery and JavaScript problems methodologically, and we’ll cover many of the common caveats that every jQuery user encounters sooner or later. You’ll learn what you should do when your code doesn’t do what it should. Sure, docs and support can provide a quick leg up when you're in a pinch, but once you arm yourself with the right tools and knowledge, you can traverse the thorniest of thickets!",
                upload_date: "2011-06-28 00:38:40",
                thumbnail_small: "http://b.vimeocdn.com/ts/169/468/169468190_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/169/468/169468190_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/169/468/169468190_640.jpg",
                duration: 3082,
                tags: [
                    {
                        text: 'Javascript'
                    },
                    {
                        text: 'jquery'
                    },
                    {
                        text: 'debugging'
                    }
                ],
                type: 'vimeo'
            },
            {
                id: 17,
                videoId: 25762560,
                title: "TXJS 2011 A2 - Ben Combee - The JavaScript Behind HP webOS: Enyo and Node.js",
                description: "HP webOS is a platform powering devices as diverse as the world’s smallest smartphone, the HP Veer, to power dual-core HP TouchPad tablet. Underneath it all is WebKit, HTML, and JavaScript, powering both applications and system services. This talk will highlight our next-generation JS application framework, Enyo, and also look at how node.js is used to provide system services and background processing.",
                upload_date: "2011-06-29 08:05:30",
                thumbnail_small: "http://b.vimeocdn.com/ts/169/889/169889004_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/169/889/169889004_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/169/889/169889004_640.jpg",
                duration: 2361,
                tags: [
                    {
                        text: 'Javascript'
                    },
                    {
                        text: 'Nodejs'
                    },
                    {
                        text: 'webos'
                    }
                ],
                type: 'vimeo'
            },
            {
                id: 18,
                videoId: 25851636,
                title: "TXJS 2011 B2 - Matthew Eernisse - Full-Stack JavaScript Fallacies",
                description: "With the mainstreaming of server-side JavaScript, the possibility of full-stack JavaScript development finally seems to be coming to fruition. Writing once, and running the same code everywhere seems like the obvious big win, along with the ease of writing complex server-side applications in a simple, flexible language like JavaScript. Actually, full-stack JS is awesome, but these aren't necessarily the reasons why. This talk will bust some of the myths about full-stack JS development, and take a realistic look at the real benefits of ‘JS everywhere.",
                upload_date: "2011-07-01 01:37:57",
                thumbnail_small: "http://b.vimeocdn.com/ts/170/471/170471609_100.jpg",
                thumbnail_medium: "http://b.vimeocdn.com/ts/170/471/170471609_200.jpg",
                thumbnail_large: "http://b.vimeocdn.com/ts/170/471/170471609_640.jpg",
                duration: 1274,
                tags: [
                    {
                        text: 'Javascript'
                    },
                    {
                        text: 'Nodejs'
                    },
                    {
                        text: 'webos'
                    }
                ],
                type: 'vimeo'
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

                    for (var i = 0; i < videoTags.length; i++) {
                        if (videoTags[i].toLowerCase().indexOf(q) > -1)
                            return true;
                    }

                }) || item.title.toLowerCase().indexOf(query) > -1;

            });

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


