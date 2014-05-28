angular.module('ndc')
  .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid, _) {
    if (!Config.API.useMocks) return;

    var collectionUrl = APIBaseUrl + 'users';
    var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);

    $log.log('***************************************************************************************************************');
    $log.log('Overriding all calls to `' + collectionUrl + '` with mocks defined in *dev/user-mocks.js*');
    $log.log('***************************************************************************************************************');

    var UserRepo = {};
    UserRepo.data = [
      {
        id: 1,
        username: 'ali@g.com',
        firstName: 'Ali',
        lastName: 'Alfredsen',
        profilePicture: 'http://placehold.it/50x50',
        favourites: [
          {id: 1, title: 'In The Open: Ellie Goulding - Guns And Horses', description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how it would translate acoustically since most of the album is more electronic driven.Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.', duration: 1234, videoId: 23919731, type: 'vimeo'},
          {id: 2, title: 'Tootys Wedding', description: 'Some long description about a movie and stuff', duration: 1234, videoId: 25799594, type: 'vimeo'}
        ],
        verified: true,
        profile: 'administrator'
      },
      {
        id: 2,
        username: 'ali@g.com',
        firstName: '2Ali',
        lastName: 'Alfredsen',
        profilePicture: 'http://placehold.it/50x50',
        favourites: [
          {id: 1, title: 'In The Open: Ellie Goulding - Guns And Horses', description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how it would translate acoustically since most of the album is more electronic driven.Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.', duration: 1234, videoId: 23919731, type: 'vimeo'},
          {id: 2, title: 'Tootys Wedding', description: 'Some long description about a movie and stuff', duration: 1234, videoId: 25799594, type: 'vimeo'}
        ],
        verified: true,
        profile: 'administrator'
      },
      {
        id: 3,
        username: 'ali@g.com',
        firstName: '4Ali',
        lastName: 'Alfredsen',
        profilePicture: 'http://placehold.it/50x50',
        favourites: [
          {id: 1, title: 'In The Open: Ellie Goulding - Guns And Horses', description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how it would translate acoustically since most of the album is more electronic driven.Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.', duration: 1234, videoId: 23919731, type: 'vimeo'},
          {id: 2, title: 'Tootys Wedding', description: 'Some long description about a movie and stuff', duration: 1234, videoId: 25799594, type: 'vimeo'}
        ],
        verified: true,
        profile: 'administrator'
      },
      {
        id: 4,
        username: 'ali@g.com',
        firstName: '4Ali',
        lastName: 'Alfredsen',
        profilePicture: 'http://placehold.it/50x50',
        favourites: [
          {id: 1, title: 'In The Open: Ellie Goulding - Guns And Horses', description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how it would translate acoustically since most of the album is more electronic driven.Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.', duration: 1234, videoId: 23919731, type: 'vimeo'},
          {id: 2, title: 'Tootys Wedding', description: 'Some long description about a movie and stuff', duration: 1234, videoId: 25799594, type: 'vimeo'}
        ],
        verified: true,
        profile: 'administrator'
      },
      {
        id: 5,
        username: 'ali@g.com',
        firstName: 'Ali',
        lastName: 'Alfredsen',
        profilePicture: 'http://placehold.it/50x50',
        favourites: [
          {id: 1, title: 'In The Open: Ellie Goulding - Guns And Horses', description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how it would translate acoustically since most of the album is more electronic driven.Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.', duration: 1234, videoId: 23919731, type: 'vimeo'},
          {id: 2, title: 'Tootys Wedding', description: 'Some long description about a movie and stuff', duration: 1234, videoId: 25799594, type: 'vimeo'}
        ],
        verified: true,
        profile: 'administrator'
      },
      {
        id: 6,
        username: 'ali@g.com',
        firstName: 'Ali',
        lastName: 'Alfredsen',
        profilePicture: 'http://placehold.it/50x50',
        favourites: [
          {id: 1, title: 'In The Open: Ellie Goulding - Guns And Horses', description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how it would translate acoustically since most of the album is more electronic driven.Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.', duration: 1234, videoId: 23919731, type: 'vimeo'},
          {id: 2, title: 'Tootys Wedding', description: 'Some long description about a movie and stuff', duration: 1234, videoId: 25799594, type: 'vimeo'}
        ],
        verified: true,
        profile: 'administrator'
      },
      {
        id: 7,
        username: 'ali@g.com',
        firstName: 'Ali',
        lastName: 'Alfredsen',
        profilePicture: 'http://placehold.it/50x50',
        favourites: [
          {id: 1, title: 'In The Open: Ellie Goulding - Guns And Horses', description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how it would translate acoustically since most of the album is more electronic driven.Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.', duration: 1234, videoId: 23919731, type: 'vimeo'},
          {id: 2, title: 'Tootys Wedding', description: 'Some long description about a movie and stuff', duration: 1234, videoId: 25799594, type: 'vimeo'}
        ],
        verified: true,
        profile: 'administrator'
      },
      {
        id: 8,
        username: 'ali@g.com',
        firstName: 'Ali',
        lastName: 'Alfredsen',
        profilePicture: 'http://placehold.it/50x50',
        favourites: [
          {id: 1, title: 'In The Open: Ellie Goulding - Guns And Horses', description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how it would translate acoustically since most of the album is more electronic driven.Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.', duration: 1234, videoId: 23919731, type: 'vimeo'},
          {id: 2, title: 'Tootys Wedding', description: 'Some long description about a movie and stuff', duration: 1234, videoId: 25799594, type: 'vimeo'}
        ],
        verified: true,
        profile: 'administrator'
      },
      {
        id: 9,
        username: 'ali@g.com',
        firstName: 'Ali',
        lastName: 'Alfredsen',
        profilePicture: 'http://placehold.it/50x50',
        favourites: [
          {id: 1, title: 'In The Open: Ellie Goulding - Guns And Horses', description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how it would translate acoustically since most of the album is more electronic driven.Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.', duration: 1234, videoId: 23919731, type: 'vimeo'},
          {id: 2, title: 'Tootys Wedding', description: 'Some long description about a movie and stuff', duration: 1234, videoId: 25799594, type: 'vimeo'}
        ],
        verified: true,
        profile: 'administrator'
      },
      {
        id: 10,
        username: 'ali@g.com',
        firstName: 'Ali',
        lastName: 'Alfredsen',
        profilePicture: 'http://placehold.it/50x50',
        favourites: [
          {id: 1, title: 'In The Open: Ellie Goulding - Guns And Horses', description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how it would translate acoustically since most of the album is more electronic driven.Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.', duration: 1234, videoId: 23919731, type: 'vimeo'},
          {id: 2, title: 'Tootys Wedding', description: 'Some long description about a movie and stuff', duration: 1234, videoId: 25799594, type: 'vimeo'}
        ],
        verified: true,
        profile: 'administrator'
      },
      {
        id: 11,
        username: 'ali@g.com',
        firstName: 'Ali',
        lastName: 'Alfredsen',
        profilePicture: 'http://placehold.it/50x50',
        favourites: [
          {id: 1, title: 'In The Open: Ellie Goulding - Guns And Horses', description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how it would translate acoustically since most of the album is more electronic driven.Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.', duration: 1234, videoId: 23919731, type: 'vimeo'},
          {id: 2, title: 'Tootys Wedding', description: 'Some long description about a movie and stuff', duration: 1234, videoId: 25799594, type: 'vimeo'}
        ],
        verified: true,
        profile: 'administrator'
      },
      {
        id: 12,
        username: 'ali@g.com',
        firstName: 'Ali',
        lastName: 'Alfredsen',
        profilePicture: 'http://placehold.it/50x50',
        favourites: [
          {id: 1, title: 'In The Open: Ellie Goulding - Guns And Horses', description: 'Having listened to Ellie Gouldings debut album, Lights, I was always curious as to how it would translate acoustically since most of the album is more electronic driven.Portland, Oregon Ellie made it to San Francisco with just enough time to meet up.', duration: 1234, videoId: 23919731, type: 'vimeo'},
          {id: 2, title: 'Tootys Wedding', description: 'Some long description about a movie and stuff', duration: 1234, videoId: 25799594, type: 'vimeo'}
        ],
        verified: true,
        profile: 'administrator'
      }
    ];
    UserRepo.index = {};

    angular.forEach(UserRepo.data, function (item, key) {
      UserRepo.index[item.id] = item;
    });

    //GET users/
    $httpBackend.whenGET(collectionUrl).respond(function (method, url, data, headers) {
      $log.debug('Intercepted GET to `' + url + '`', data);
      return [200, UserRepo.data, {/*headers*/}];
    });

    //POST users/1/verify
    var regx = (regexEscape(collectionUrl + '/') + IdRegExp + regexEscape('/verify')).replace('$','');
    console.log(regx);
    $httpBackend.whenPOST(new RegExp(regx)).respond(function (method, url, data, headers) {
      $log.debug('Intercepted POST to `' + url + '`', data);
      return [200, {}, {/*headers*/}];
    });

    //POST users/
    $httpBackend.whenPOST(collectionUrl).respond(function (method, url, data, headers) {
      $log.debug('Intercepted POST to `' + url + '`', data);
      var User = angular.fromJson(data);

      User.id = guid();
      UserRepo.data.push(User);
      UserRepo.index[User.id] = User;

      return [200, User, {/*headers*/}];
    });

    //GET users/id
    $httpBackend.whenGET(new RegExp(regexEscape(collectionUrl + '/') + IdRegExp)).respond(function (method, url, data, headers) {
      $log.debug('Intercepted GET to `' + url + '`');
      var id = url.match(new RegExp(IdRegExp))[0];
      return [UserRepo.index[id] ? 200 : 404, UserRepo.index[id] || null, {/*headers*/}];
    });

    //GET users?token=<token>
    $httpBackend.whenGET(new RegExp(regexEscape(collectionUrl + '?token=') + IdRegExp)).respond(function (method, url, data, headers) {
      $log.debug('Intercepted GET to `' + url + '`');
      var token = url.match(new RegExp(IdRegExp))[0];
      if (token === 'take-on-me') {
        return [200, UserRepo.index[0], {/*headers*/}];
      }
      return [404, null, {/*headers*/}];
    });

    //GET users?verificationToken=<token>
    $httpBackend.whenGET(new RegExp(regexEscape(collectionUrl + '?verificationToken=') + IdRegExp)).respond(function (method, url, data, headers) {
      $log.debug('Intercepted GET to `' + url + '`');
      var token = url.match(new RegExp(IdRegExp))[0];
      if (token) {
        return [200, UserRepo.data[0], {/*headers*/}];
      }
      return [404, null, {/*headers*/}];
    });

    //PUT users/id
    $httpBackend.whenPUT(new RegExp(regexEscape(collectionUrl + '/') + IdRegExp)).respond(function (method, url, data, headers) {
      $log.debug('Intercepted PUT to `' + url + '`');
      var id = url.match(new RegExp(IdRegExp))[0];

      if (!UserRepo.index[id]) {
        return [404, {} , {/*headers*/}];
      }

      var User = UserRepo.index[id] = angular.fromJson(data);

      return [200, User, {/*headers*/}];
    });

    //DELETE users/id
    $httpBackend.whenDELETE(new RegExp(regexEscape(collectionUrl + '/') + IdRegExp)).respond(function (method, url, data, headers) {
      $log.debug('Intercepted DELETE to `' + url + '`');
      var id = url.match(new RegExp(IdRegExp))[0];

      var User = UserRepo.index[id];
      if (!User) {
        return [404, {} , {/*headers*/}];
      }
      delete UserRepo.index[User.id];
      var index = UserRepo.data.indexOf(User);
      UserRepo.data.splice(index, 1);
      return [200, User , {/*headers*/}];
    });

  });


