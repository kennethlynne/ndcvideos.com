angular.module('ndc')
    .run(function (Config, $httpBackend, $log, BaseUrl) {

        //Only load mocks if config says so
        if(!Config.useMocks) return;

        var baseUrl = BaseUrl + 'token';
        var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);

        console.log('Stubbing authentication API - ' + baseUrl);
        console.log('************');

        var MockData = {};

        //GET token/ should return a list og messages
        $httpBackend.whenGET(baseUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to token', data);
            return [200, {}, {/*headers*/}];
        });

        //POST token/ should save a message and return the message with an id
        $httpBackend.whenPOST(baseUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted POST to token', data);

            if (data.indexOf('password=password') >= 0) {
                var response = {
                    "access_token":"take-on-me",
                    "token_type":"bearer",
                    "expires_in":1209599,
                    "userName":"Ali",
                    ".issued":"Mon, 14 Oct 2013 06:53:32 GMT",
                    ".expires":"Mon, 28 Oct 2013 06:53:32 GMT"
                };
            }

            return [200, response, {/*headers*/}];
        });

    });
