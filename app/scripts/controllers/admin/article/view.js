'use strict';

angular.module('dubidubaApp')
  	.controller('AdminArticleViewCtrl', ['$scope', '$http', '$location', '$routeParams', 'Item', function ($scope, $http, $location, $routeParams, Item) {
    	
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

	    $http.get('/api/item/' + $routeParams.id).success(function(article) {
	      $scope.articleData = article;
	    }).error(function(error){
	    	
	    });

	}]);
