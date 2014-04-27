'use strict';

angular.module('dubidubaApp')
  .controller('PedidosCtrl', function ($scope, $http, Stocks) {

    simpleCart.load();
    $scope.emptyCart = true;
    $scope.redirecting = false;

    var _init = function(){

		var _items = simpleCart.items();
		$scope.emptyCart = ( _items.length > 0);

	};
	
	simpleCart.bind( 'afterSave' , function( item ){
		_init();
		if(!$scope.$$phase){
			$scope.$apply();
		}
	});

    $scope.SendToCheckout = function(){

		var   _i = 0
			, _items = []
			, _itemsToUpdate = []
			;

		_items = simpleCart.items();
		
		for(_i=0; _i < _items.length; _i++){
			_itemsToUpdate.push({
				  iditem : _items[_i].options().articleid
				, idstock : _items[_i].options().idsize
				, quantity : _items[_i].options().currentquantity - _items[_i].quantity()
			});
		}

		Stocks.update({stocks:_itemsToUpdate},function(p_data){
			simpleCart.checkout();
			simpleCart.empty();
			$scope.redirecting = true;
			$scope.emptyCart = true;
		},function(p_error){
			
		});

	}

	_init();

});
