'use strict';

angular.module('dubidubaApp')
  	.controller('AdminArticleNewCtrl', ['$scope', '$http', '$location', 'Item', function ($scope, $http, $location, Item) {
    	
    	$scope.errors = {};
	    $scope.articleData = {}
	    
	  	$scope.newArticle = function(p_data){
	        Item.create(p_data, _OnSuccess, _OnError);
	    }

	    function _OnSuccess(){
	    	$location.path("/admin/article");
	    }

	    function _OnError( err ){
	    	 $scope.errors.other = err.message;
	    }
}]);
