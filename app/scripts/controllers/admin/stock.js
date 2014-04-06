'use strict';

angular.module('dubidubaApp')
.controller('AdminStockCtrl', ['$scope', '$http', '$location', 'ItemSearch', function ($scope, $http, $location, ItemSearch) {

	$scope.searchedItems = [];

	$scope.sizes = [
        {   name : 'Talla estándar',
            value : 0
        },
        {   name : 'Dimensiones',
            value : 1
        },
        {   name : 'Otras tallas',
            value : 2
        }
    ];
    
    $scope.goTo = function( p_route ){
    	$location.path(p_route);
    }

    $scope.Search = function( p_searchKey ){
    	if(p_searchKey != ""){
    		ItemSearch.get({ 'searchkey' : p_searchKey }, function( p_data ){
	    		if(p_data.data && p_data.total > 0 ){
	    			$scope.searchedItems = p_data.data;
	    		}
	    	}, function( p_error){

	    	});
    	}    	
	}

}]);
