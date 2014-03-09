'use strict';

angular.module('dubidubaApp')
.controller('AdminArticleEditCtrl', ['$scope', '$http', '$routeParams', '$location', 'Item', function ($scope, $http, $routeParams, $location, Item) {
	
	$scope.errors = {};
    $scope.articleData = {};
    $scope.categories = [];
    $scope.imagesLoading = 0;
    $scope.tinyMCE = false;
    
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
        $scope.tinyMCE = true;
        _LoadCategories();
    }

    $scope.goTo = function( p_route ){
		$location.path(p_route);
	}

  	$scope.saveArticle = function(p_data){

        if($scope.imagesToLoad.length > 0){
            var _i = 0;
            for(_i = 0; _i < $scope.imagesToLoad.length; _i++){
                if(!$scope.imagesToLoad[_i].loaded){
                    $scope.imagesToLoad.splice(_i, 1);
                }
            }
            p_data.photos = $scope.imagesToLoad;
        }

        p_data.category = $scope.categorySelected.id;
        p_data.subcategory = $scope.subcategorySelected;

        if($routeParams.id){
            Item.update(p_data, _OnSuccess, _OnError);
        }else{
            Item.create(p_data, _OnSuccess, _OnError); 
        }
        
    }

    function _OnSuccess(){
    	$location.path("/admin/article");
    }

    function _OnError( err ){
    	 $scope.errors.other = err.message;
    }

    function _LoadItem(){
        if($routeParams.id){
            $http.get('/api/item/' + $routeParams.id).success(function(article) {
            $scope.articleData = article;
              _Init();
            }).error(function(error){
                
            });
        }else{
            $scope.imagesToLoad =[];
            $scope.imagesToLoad[0] = {loading : false};
        }
    } 

    function _LoadCategories(){
        $http.get('/api/category').success(function(p_data) {
            if(p_data[0]){
                $scope.categories = p_data[0].categories;
                var _i = 0;
                for(_i = 0; _i < $scope.categories.length; _i++){
                    if($scope.articleData.category == $scope.categories[_i].id){
                        $scope.categorySelected = $scope.categories[_i];
                    }
                }
                $scope.subcategorySelected = $scope.articleData.subcategory;
            }
        }).error(function(error){
            
        });
    }

    _LoadItem();

}]);