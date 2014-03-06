'use strict';

angular.module('dubidubaApp')
  .controller('AdminCategoriesCtrl', function ($scope, $http, Category ) {
    
    $scope.categories = [];
  	$scope.isCollapsed = true;  

  	$scope.saveCategory = function(p_data){

        Category.create(p_data, _OnSuccess, _OnError); 
        
    }

    function _OnSuccess(){
    	$scope.isCollapsed = true; 
    	$scope.newCategory = {};
    	_LoadCategories();
    }

    function _OnError(){

    }

    function _LoadCategories(){
    	$http.get('/api/category').success(function(p_data) {
        	$scope.categories = p_data;
        }).error(function(error){
            
        });
    }

    $scope.RemoveCategory = function( p_id ){
    	$http.delete('/api/category/' + p_id).success(function(p_data) {
        	_LoadCategories();
        }).error(function(error){
            
        });
    }

    _LoadCategories();

  });
