'use strict';

angular.module('dubidubaApp')
.controller('AdminArticleEditCtrl', ['$scope', '$http', '$routeParams', '$location', 'Item', function ($scope, $http, $routeParams, $location, Item) {
	
	$scope.errors = {};
    $scope.articleData = {}
    
    $scope.goTo = function( p_route ){
		$location.path(p_route);
	}

  	$scope.saveArticle = function(p_data){
        Item.update(p_data, _OnSuccess, _OnError);
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