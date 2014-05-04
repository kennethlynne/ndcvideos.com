angular.module('ndc')
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid) {
        if(!Config.API.useMocks) return;

        var collectionUrl = APIBaseUrl + 'tags';
        var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);
        var QueryRegExp = /[\d\w-_\.\s]*$/.toString().slice(1, -1);

        $log.log('***************************************************************************************************************');
        $log.log('Overriding all calls to `' + collectionUrl + '` with mocks defined in *dev/tag-mock.js*');
        $log.log('***************************************************************************************************************');

        var TagRepo = {};
        TagRepo.data = [
            {id: 1, text:'Javascript'},
            {id: 2, text:'Angular'},
            {id: 3, text:'.NET'},
            {id: 4, text:'Java'},
            {id: 5, text:'Firebase'},
            {id: 6, text:'Ember'}
        ];
        TagRepo.index = {};

        angular.forEach(TagRepo.data, function(item, key) {
            TagRepo.index[item.id] = item;
        });

        //GET tag/
        $httpBackend.whenGET(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to `' + url + '`', data);
            return [200, TagRepo.data, {/*headers*/}];
        });

        //POST tag/
        $httpBackend.whenPOST(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted POST to `' + url + '`', data);
            var Tag = angular.fromJson(data);

            Tag.id = guid();
            TagRepo.data.push(Tag);
            TagRepo.index[Tag.id] = Tag;

            return [200, Tag, {/*headers*/}];
        });

        //GET tag/search?q=<query>
        $httpBackend.whenGET( new RegExp(regexEscape(collectionUrl + '?q=') + QueryRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to `' + url + '`');
            var term = url.match( new RegExp(QueryRegExp) )[0] || '';

            var hits = TagRepo.data.filter(function (tag) {
                return tag && typeof tag.text == 'string' && tag.text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
            });

            return [200, hits, {/*headers*/}];
        });

        //PUT tag/id
        $httpBackend.whenPUT( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted PUT to `' + url + '`');
            var id = url.match( new RegExp(IdRegExp) )[0];

            if (!TagRepo.index[id]) {
                return [404, {} , {/*headers*/}];
            }

            var Tag = TagRepo.index[id] = angular.fromJson(data);

            return [200, Tag, {/*headers*/}];
        });

        //DELETE tag/id
        $httpBackend.whenDELETE( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted DELETE to `' + url + '`');
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


