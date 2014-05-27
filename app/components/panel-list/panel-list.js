'use strict';

angular.module('ndc.components')
  .controller('panelListComponentCtrl', function ($scope, CurrentUser) {
    $scope.listItems = [
      {
        title: 'Videos',
        uiSref: 'videos',
        cssClass: ['icon-camcorder']
      },
      // {
      //   title: 'Favorites',
      //   uiSref: 'favorites',
      //   cssClass: ['icon-heart']
      // },
      // {
      //   title: 'Agenda',
      //   uiSref: 'agenda',
      //   cssClass: ['icon-calendar']
      // },
      {
        title: 'Admin',
        uiSref: 'admin',
        requiredRoles: [
          'ndcVideos.create',
          'ndcVideos.remove',
          'ndcVideos.view',
          'ndcVideos.list',
          'ndcUsers.create',
          'ndcUsers.remove',
          'ndcUsers.view',
          'ndcUsers.list'
        ],
        cssClass: ['icon-lock']
      }
    ];

    $scope.currentUser = {
      hasRoles: CurrentUser.hasRoles
    }
  })
  .component('panelList', function () {
    return {
      controller: 'panelListComponentCtrl'
    };
  });
