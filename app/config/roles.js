angular.module('ndc')
  .value('profiles', {})
  .run(function (ngRoles, profiles) {
    ngRoles.addApplication('ndcVideos', ['create', 'remove', 'view', 'list']);
    ngRoles.addApplication('ndcUsers', ['create', 'remove', 'view', 'list']);

    profiles.guest = profiles.guest || ngRoles.addProfile('guest');
    profiles.registered = profiles.registered || ngRoles.addProfile('registered', ['ndcVideos.list', 'ndcVideos.view']);
    profiles.administrator = profiles.administrator || ngRoles.addProfile('administrator', ['ndcVideos.*', 'ndcUsers.*']);
  });