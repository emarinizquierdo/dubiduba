'use strict';

angular.module('dubidubaApp')
.controller('AdminArticleEditCtrl', ['$scope', '$http', '$routeParams', '$location', 'Item', function ($scope, $http, $routeParams, $location, Item) {
	
	$scope.errors = {};
    $scope.articleData = {}
    $scope.imagesLoading = 0;

    $scope.imagesToLoad = [];
    $scope.imagesToLoad[0] = { loading : false };

    $scope.goTo = function( p_route ){
		$location.path(p_route);
	}

  	$scope.saveArticle = function(p_data){
        if($scope.imagesToLoad.length > 0){
            var _i = 0;
            for(_i = 0; _i < $scope.imagesToLoad.length; _i++){
                if($scope.imagesToLoad[_i].loaded){
                    p_data.photos.push($scope.imagesToLoad[_i]);
                }
            }
        }
        
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