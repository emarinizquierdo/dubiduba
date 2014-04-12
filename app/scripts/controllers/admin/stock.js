'use strict';

angular.module('dubidubaApp')
.controller('AdminStockCtrl', ['$scope', '$http', '$location', 'ItemSearch', 'Item', 'Size', function ($scope, $http, $location, ItemSearch, Item, Size) {

	$scope.searchedItems = [];
    $scope.sizes = [];

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

    function _LoadSizes(){
        Size.get({}, function( p_data ){
            $scope.sizes = p_data;
        }, function( p_error ){

        });
    }

    $scope.AddStock = function( p_itemToUpdate ){
        
        var   _auxStock = p_itemToUpdate.stock
            , _i = 0
            , _auxTotal = 0 
            ;

        _auxStock.push(p_itemToUpdate.stockToAdd);

        p_itemToUpdate.stock = _auxStock;

        for(_i = 0; _i < p_itemToUpdate.stock.length; _i++){
            _auxTotal = (p_itemToUpdate.stock[_i].amount) ? (_auxTotal + parseInt(p_itemToUpdate.stock[_i].amount)) : _auxTotal;
        }

        p_itemToUpdate.totalStock = _auxTotal;

        Item.update(p_itemToUpdate, function(){
            p_itemToUpdate.stockToAdd = null;
        }, function(){
            
        });
    }

    $scope.RemoveStock = function( p_itemToUpdate, p_index ){
        
        var   _auxStock = p_itemToUpdate.stock
            , _i = 0
            , _auxTotal = 0 
            ;

        _auxStock.splice(p_index,1);

        p_itemToUpdate.stock = _auxStock;

        for(_i = 0; _i < p_itemToUpdate.stock.length; _i++){
            _auxTotal = (p_itemToUpdate.stock[_i].amount) ? ( _auxTotal + parseInt(p_itemToUpdate.stock[_i].amount) ) : _auxTotal;
        }

        p_itemToUpdate.totalStock = _auxTotal;

        Item.update(p_itemToUpdate, function(){

        }, function(){

        });
    }

    _LoadSizes();

}]);
