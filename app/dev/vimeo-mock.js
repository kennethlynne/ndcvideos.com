angular.module('ndc')
  .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid) {
    if (!Config.API.useMocks) return;

    var collectionUrl = APIBaseUrl + 'imports';
    var IdRegExp = /([0-9]+)[$\d-_]/.toString().slice(1, -1);
//        var QueryRegExp = /[\d\w-_]+/.toString().slice(1, -1);
    var QueryRegExp = /\/imports\/([0-9]+)/.toString().slice(1, -1);


    $log.log('***************************************************************************************************************');
    $log.log('Overriding all calls to `' + collectionUrl + '` with mocks defined in *dev/vimeo-mocks.js*');
    $log.log('***************************************************************************************************************');

    var VimeoRepo = {};
    VimeoRepo.data = [
      {
        id: 86603468,
        videoId: 86396740,
        type: 'vimeo',
        title: "NDCOslo Trailer",
        description: 'A festival for developers! Oslo Spektrum, Norway 2-6 June 2014',
        url: "http://vimeo.com/86603468",
        upload_date: "2014-02-13 08:04:18",
        mobile_url: "http://vimeo.com/m/86603468",
        thumbnail_small: "http://b.vimeocdn.com/ts/464/338/464338254_100.jpg",
        thumbnail_medium: "http://b.vimeocdn.com/ts/464/338/464338254_200.jpg",
        thumbnail_large: "http://b.vimeocdn.com/ts/464/338/464338254_640.jpg",
        user_id: 12026726,
        user_name: "NDC Conferences",
        user_url: "http://vimeo.com/ndcoslo",
        user_portrait_small: "http://b.vimeocdn.com/ps/674/316/6743161_30.jpg",
        user_portrait_medium: "http://b.vimeocdn.com/ps/674/316/6743161_75.jpg",
        user_portrait_large: "http://b.vimeocdn.com/ps/674/316/6743161_100.jpg",
        user_portrait_huge: "http://b.vimeocdn.com/ps/674/316/6743161_300.jpg",
        stats_number_of_likes: 4,
        stats_number_of_plays: 624,
        stats_number_of_comments: 0,
        duration: 134,
        width: 1280,
        height: 720,
        tags: "developer. festival",
        embed_privacy: "anywhere",
        isPublished: true
      },
      {
        id: 86396740,
        videoId: 86396740,
        type: 'vimeo',
        title: "Keynote with Dan North - Jackstones: the Journey to Mastery",
        description: "It takes time to become really good at something. Time, commitment and a genuine passion. If you're not having fun the learning is a chore, if you are then it hardly feels like learning at all, at least not like the thing they made you do in school. Craftsmanship is about making that commitment and then figuring out how to see it through. Using examples of mastery from various fields and a thirty year paper-folding habit, Dan describes some of the many facets of craftsmanship and tries to figure out exactly what the craft is that we programmers do.",
        url: "http://vimeo.com/86396740",
        upload_date: "2014-02-11 04:25:00",
        mobile_url: "http://vimeo.com/m/86396740",
        thumbnail_small: "http://b.vimeocdn.com/ts/464/052/464052168_100.jpg",
        thumbnail_medium: "http://b.vimeocdn.com/ts/464/052/464052168_200.jpg",
        thumbnail_large: "http://b.vimeocdn.com/ts/464/052/464052168_640.jpg",
        user_id: 12026726,
        user_name: "NDC Conferences",
        user_url: "http://vimeo.com/ndcoslo",
        user_portrait_small: "http://b.vimeocdn.com/ps/674/316/6743161_30.jpg",
        user_portrait_medium: "http://b.vimeocdn.com/ps/674/316/6743161_75.jpg",
        user_portrait_large: "http://b.vimeocdn.com/ps/674/316/6743161_100.jpg",
        user_portrait_huge: "http://b.vimeocdn.com/ps/674/316/6743161_300.jpg",
        stats_number_of_likes: 6,
        stats_number_of_plays: 270,
        stats_number_of_comments: 0,
        duration: 3216,
        width: 1280,
        height: 720,
        tags: "Dan North, ndclondon, keynote",
        embed_privacy: "nowhere",
        isPublished: false
      }
    ];
    VimeoRepo.index = {};

    angular.forEach(VimeoRepo.data, function (item, key) {
      VimeoRepo.index[item.id] = item;
    });

    //GET imports/
    $httpBackend.whenGET(collectionUrl + '?provider=vimeo').respond(function (method, url, data, headers) {
      $log.debug('Intercepted GET to `' + collectionUrl + '`', data);
      return [200, VimeoRepo.data, {/*headers*/}];
    });

    //GET imports/id
    $httpBackend.whenGET(new RegExp(regexEscape(collectionUrl + '/') + IdRegExp)).respond(function (method, url, data, headers) {
      $log.debug('Intercepted GET to `' + collectionUrl + '`');

      var id = url.match(new RegExp(QueryRegExp))[1];

      return [VimeoRepo.index[id] ? 200 : 404, VimeoRepo.index[id] || null, {/*headers*/}];
    });

  });