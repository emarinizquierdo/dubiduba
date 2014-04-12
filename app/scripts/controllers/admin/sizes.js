'use strict';

angular.module('dubidubaApp')
.controller('AdminSizesCtrl', ['$scope', '$http', 'Size', function ($scope, $http, Size) {

	$scope.sizes = [];
	$scope.newsize = {};

	function _LoadSizes(){
		Size.get({}, function( p_data ){
			$scope.sizes = p_data;
		}, function( p_error ){

		});
	}

	$scope.AddSize = function( p_data ){
		Size.create(p_data, function( p_data ){
			$scope.newsize = {};
			_LoadSizes();
		}, function( p_error ){

		});
	}
 
	$scope.RemoveSize = function( p_id ){

		Size.delete({ id : p_id }, function(p_data) {
        	_LoadSizes();
        },function(error){
            
        });

	};

	_LoadSizes();


 }]);
