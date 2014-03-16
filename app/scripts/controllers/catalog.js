'use strict';

angular.module('dubidubaApp')
  .controller('CatalogCtrl', function ($scope, $http, $location, $routeParams) {
    
    $scope.Items = [];
    $scope.categories = [];
    $scope.categoriesFilterValues = [];

    $scope.goTo = function( p_route ){
    	$location.path(p_route);
    }

    $scope.categoriesCheckChange = function(selected, value){
    	if(selected){
    		$scope.categoriesFilterValues.push(value);
    	}else{
    		$scope.categoriesFilterValues.pop(value);
    	}
    }

    function _ProcessItems( p_data ){

      $scope.Items = p_data || [];
      
      var _i;
      for( _i = 0; _i < $scope.Items.length; _i++ ){
        $scope.Items[_i].mainPhoto = "http://farm" 
        + $scope.Items[_i].photos[0].photo.farm 
        + ".staticflickr.com/" 
        + $scope.Items[_i].photos[0].photo.server + "/" 
        + $scope.Items[_i].photos[0].photo.id + "_" 
        + $scope.Items[_i].photos[0].photo.secret + "_b.jpg";
      }       

    }

    function _LoadCatalog(){

    	if($routeParams.id){
            $http.get('/api/item/', { params : { category : $routeParams.id }}).success(function(items) {  
	      		_ProcessItems(items);      
	    	});
        }else{
            $http.get('/api/item').success(function(items) {  
	      		_ProcessItems(items);      
	    	});
        }

    	
    }

    function _LoadCategories(){
      $http.get('/api/category').success(function(p_data) {
          if(p_data[0]){
                $scope.categories = p_data[0];
            }else{
                $scope.categories.categories = [{
                    id: new Date().getTime(),
                    name: null,
                    children: []
                }];
            }
        }).error(function(error){
            
        });
    }

    _LoadCategories();

    _LoadCatalog();

  });
