'use strict';

angular.module('dubidubaApp')
	.controller('AdminArticleCtrl', function ($scope, $http, $location, Item) {

	    $scope.goTo = function( p_route ){
	    	$location.path(p_route);
	    }

	    $scope.RemoveItem = function( p_id ){
	    	$http.delete('/api/item/' + p_id).success(function(p_data) {
	        	_LoadItems();
	        }).error(function(error){
	            
	        });
    	}

    	function _LoadItems(){
    		$http.get('/api/item').success(function(items) {
	      		$scope.items = items;
	    	});
	 	}

	 	_LoadItems();

	});
