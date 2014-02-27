angular.module('ndc')
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid) {
        if(!Config.API.useMocks) return;

        var collectionUrl = APIBaseUrl + 'Tags';
        var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);

        console.log('Stubbing tags API - ' + collectionUrl);
        console.log('************');

        var TagsRepo = {};
        TagsRepo.data = [{id: guid(), text:'Hello World'}];
        TagsRepo.index = {};

        angular.forEach(TagsRepo.data, function(item, key) {
            TagsRepo.index[item.id] = item;
        });

        //GET tags/
        $httpBackend.whenGET(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to tags', data);
            return [200, TagsRepo.data, {/*headers*/}];
        });

        //POST tags/
        $httpBackend.whenPOST(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted POST to tags', data);
            var Tags = angular.fromJson(data);

            Tags.id = guid();
            TagsRepo.data.push(Tags);
            TagsRepo.index[Tags.id] = Tags;

            return [200, Tags, {/*headers*/}];
        });

        //GET tags/id
        $httpBackend.whenGET( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to tags');
            var id = url.match( new RegExp(IdRegExp) )[0];
            return [TagsRepo.index[id]?200:404, TagsRepo.index[id] || null, {/*headers*/}];
        });

        //PUT tags/id
        $httpBackend.whenPUT( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted PUT to tags');
            var id = url.match( new RegExp(IdRegExp) )[0];

            if (!TagsRepo.index[id]) {
                return [404, {} , {/*headers*/}];
            }

            var Tags = TagsRepo.index[id] = angular.fromJson(data);

            return [200, Tags, {/*headers*/}];
        });

        //DELETE tags/id
        $httpBackend.whenDELETE( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted DELETE to tags');
            var id = url.match( new RegExp(IdRegExp) )[0];

            var Tags = TagsRepo.index[id];
            if (!Tags) {
                return [404, {} , {/*headers*/}];
            }
            delete TagsRepo.index[Tags.id];
            var index = TagsRepo.data.indexOf(Tags);
            TagsRepo.data.splice(index, 1);
            return [200, Tags , {/*headers*/}];
        });

    });


