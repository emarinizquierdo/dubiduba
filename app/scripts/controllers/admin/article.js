'use strict';

angular.module('dubidubaApp')
	.controller('AdminArticleCtrl', function ($scope, $http, $location, Item) {

	    $http.get('/api/item').success(function(items) {
	      $scope.items = items;
	    });

	    $scope.goTo = function( p_route ){
	    	$location.path(p_route);
	    }
	 
	});
