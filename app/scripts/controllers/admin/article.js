'use strict';

angular.module('dubidubaApp')
	.controller('AdminArticleCtrl', function ($scope, $http, $location, Item) {

		var   totalReaded = false
			, OFFSET = 20
			, itemsIndex = 0;

		$scope.items = [];

	    $scope.goTo = function( p_route ){
	    	$location.path(p_route);
	    }

	    $scope.RemoveItem = function( p_id ){
	    	$http.delete('/api/item/' + p_id).success(function(p_data) {
	        	_LoadItems();
	        }).error(function(error){
	            
	        });
    	}

    	$scope.LoadItems = function(){
    		
    		if(!totalReaded){
	    		Item.get({
	    			  'cursor' : itemsIndex || 0
	    			, 'numItems' : OFFSET
	    		}, function(data) {
	    			if(data && data.data){
	    				if( itemsIndex + OFFSET > data.total){
	    					totalReaded = true;
	    				}

	    				$scope.items = $scope.items.concat(data.data);
		         		itemsIndex += OFFSET;
	    			}
		        }, function(err) {

		        });
	    	}
    		
	 	}

	});
