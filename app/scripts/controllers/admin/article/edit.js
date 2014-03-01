'use strict';

angular.module('dubidubaApp')
.controller('AdminArticleEditCtrl', ['$scope', '$http', '$routeParams', '$location', 'Item', function ($scope, $http, $routeParams, $location, Item) {
	
	$scope.errors = {};
    $scope.articleData = {}
    $scope.imagesLoading = 0;
    $scope.imagesToLoad;

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

    function _Init(){
        $scope.imagesToLoad = $scope.articleData.photos;
        $scope.imagesToLoad[$scope.imagesToLoad.length] = {loading : false};
        $scope.articleData.sizeSelected = $scope.sizes[$scope.articleData.sizeSelected.value];
    }

    $scope.goTo = function( p_route ){
		$location.path(p_route);
	}

  	$scope.saveArticle = function(p_data){

        if($scope.imagesToLoad.length > 0){
            var _i = 0;
            for(_i = 0; _i < $scope.imagesToLoad.length; _i++){
                if(!$scope.imagesToLoad[_i].loaded){
                    p_data.photos.splice(_i, 1);
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
      _Init();
    }).error(function(error){
    	
    });
}]);