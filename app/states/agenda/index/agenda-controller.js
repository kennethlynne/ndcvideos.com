'use strict';

angular.module('ndc')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('agenda', stateFactory('Agenda', {
      url: '/agenda',
      templateUrl: 'states/agenda/index/main-view.html',
      parent: 'app'
    }));
  })
  .controller('AgendaCtrl', function ($scope) {

    $(".agenda .nav li a").click(function () {
    	var index = $(this).parent().index();
    	$(".agenda .nav li").removeClass("active");
    	$(this).parent().addClass("active");
    	$(".agenda .agenda-content").removeClass("active");
    	$(".agenda-content").eq(index).addClass("active");
    });

  });
