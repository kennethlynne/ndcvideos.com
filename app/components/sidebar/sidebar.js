'use strict';

angular.module('ndc.components')
  .controller('sidebarComponentCtrl', function ($scope) {

  	$(".navbar-toggle").click(function () {
  		$(".sidebar-component").toggleClass("closed");
  	})

  })
  .component('sidebar', function () {
    return {
      controller: 'sidebarComponentCtrl'
    };
  });
