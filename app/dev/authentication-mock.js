angular.module('ndc')
    .run(function (Config, $httpBackend, $log, BaseUrl) {

        //Only load mocks if config says so
        if(!Config.API.useMocks) return;

        var baseUrl = BaseUrl + 'token';
        var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);

        console.log('Stubbing authentication API - ' + baseUrl);
        console.log('************');

        var MockData = {};

        //GET token/ should return a list og messages
        //$httpBackend.whenGET(baseUrl).respond(function(method, url, data, headers) {
        //    $log.log('Intercepted GET to token', data);
        //    return [403];
        //});

        //POST token/ should save a message and return the message with an id
        $httpBackend.whenPOST(baseUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted POST to token', data);

            //data == 'grant_type=password&username=ali@g.com&password=pw' && headers['Accept'] == 'application/json, text/plain, */*'
            if(true)
            {
                var response = {
                    "access_token":"take-on-me",
                    "token_type":"bearer",
                    "expires_in":1209599,
                    "userName":"Ali",
                    ".issued":"Mon, 14 Oct 2013 06:53:32 GMT",
                    ".expires":"Mon, 28 Oct 2013 06:53:32 GMT",
                    "user": {
                        "id":1,
                        "userName":"Ali",
                        "favourites":[
                            {id: 1, title: 'In The Open: Ellie Goulding - Guns And Horses', description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how it would translate acoustically since most of the album is more electronic driven.Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.', duration: 1234, videoId: 23919731, type:'vimeo'},
                            {id: 2, title: 'Tootys Wedding', description: 'Some long description about a movie and stuff', duration: 1234, videoId: 25799594, type:'vimeo'}
                        ]
                    }
                };

                return [200, response, {/*headers*/}];
            }

            return [403, {message: 'There was an error when trying to log you in.'}];
        });

    });
