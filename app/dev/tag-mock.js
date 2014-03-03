angular.module('ndc')
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid) {
        if(!Config.API.useMocks) return;

        var collectionUrl = APIBaseUrl + 'tags';
        var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);

        console.log('Stubbing tag API - ' + collectionUrl);
        console.log('************');

        var TagRepo = {};
        TagRepo.data = [{id: guid(), text:'Hello World'}];
        TagRepo.index = {};

        angular.forEach(TagRepo.data, function(item, key) {
            TagRepo.index[item.id] = item;
        });

        //GET tag/
        $httpBackend.whenGET(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to tag', data);
            return [200, TagRepo.data, {/*headers*/}];
        });

        //POST tag/
        $httpBackend.whenPOST(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted POST to tag', data);
            var Tag = angular.fromJson(data);

            Tag.id = guid();
            TagRepo.data.push(Tag);
            TagRepo.index[Tag.id] = Tag;

            return [200, Tag, {/*headers*/}];
        });

        //GET tag/id
        $httpBackend.whenGET( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to tag');
            var id = url.match( new RegExp(IdRegExp) )[0];
            return [TagRepo.index[id]?200:404, TagRepo.index[id] || null, {/*headers*/}];
        });

        //PUT tag/id
        $httpBackend.whenPUT( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted PUT to tag');
            var id = url.match( new RegExp(IdRegExp) )[0];

            if (!TagRepo.index[id]) {
                return [404, {} , {/*headers*/}];
            }

            var Tag = TagRepo.index[id] = angular.fromJson(data);

            return [200, Tag, {/*headers*/}];
        });

        //DELETE tag/id
        $httpBackend.whenDELETE( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted DELETE to tag');
            var id = url.match( new RegExp(IdRegExp) )[0];

            var Tag = TagRepo.index[id];
            if (!Tag) {
                return [404, {} , {/*headers*/}];
            }
            delete TagRepo.index[Tag.id];
            var index = TagRepo.data.indexOf(Tag);
            TagRepo.data.splice(index, 1);
            return [200, Tag , {/*headers*/}];
        });

    });


