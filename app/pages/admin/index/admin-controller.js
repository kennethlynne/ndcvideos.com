'use strict';

angular.module('ndc')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('admin', stateFactory('Admin', {
            url:'/admin',
            templateUrl: 'pages/admin/index/main-view.html'
        }));
    })
    .controller('AdminCtrl', function ($scope, init) {
        $scope.data = init;

        $(".tabs-navigation li").eq(0).addClass("active");
        $(".tabs-content li").eq(0).addClass("active");

        $(".tabs-navigation li").click(function() {
        	var id = $(this).attr("id");

			$(".tabs-navigation li").removeClass("active");
        	$(this).addClass("active");

        	$(".tabs-content li").removeClass("active");
        	$(".tabs-content li#" + id + "-content").addClass("active");
        });
    });
