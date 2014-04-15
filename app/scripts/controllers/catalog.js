'use strict';

angular.module('dubidubaApp')
  .controller('CatalogCtrl', function ($scope, $http, $location, $routeParams, Item) {
    
    var   totalReaded = false
        , loadingItems = false
        , OFFSET = 20
        , itemsIndex = 0;

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

    function _GenerateMainPhoto( p_data ){

        if(p_data && p_data.photos && (p_data.photos.length >0)){
        
            return "http://farm" 
            + p_data.photos[0].photo.farm 
            + ".staticflickr.com/" 
            + p_data.photos[0].photo.server + "/" 
            + p_data.photos[0].photo.id + "_" 
            + p_data.photos[0].photo.secret + "_b.jpg";
        }
    }

    $scope.LoadCatalog = function(){

    	if($routeParams.id && !totalReaded && !loadingItems){

            loadingItems = true;

            Item.get({
                  'category' : $routeParams.id
                , 'cursor' : itemsIndex || 0
                , 'numItems' : OFFSET

            }, function(data) {

                if(data && data.data){
                    if( itemsIndex + OFFSET > data.total){
                        totalReaded = true;
                    }

                    var _i = 0;

                    for( _i = 0; _i < data.data.length; _i++ ){
                        data.data[_i].mainPhoto = _GenerateMainPhoto(data.data[_i]);
                    }

                    $scope.Items = $scope.Items.concat(data.data);
                    itemsIndex += OFFSET;
                    loadingItems = false;                   
                }

            }, function(err) {

            });    

        }else if(!totalReaded && !loadingItems){

            loadingItems = true;

            Item.get({
                  'category' : $routeParams.id
                , 'cursor' : itemsIndex || 0
                , 'numItems' : OFFSET
            }, function(data) {

                if(data && data.data){
                    if( itemsIndex + OFFSET > data.total){
                        totalReaded = true;
                    }
                    var _i = 0;

                    for( _i = 0; _i < data.data.length; _i++ ){
                        data.data[_i].mainPhoto = _GenerateMainPhoto(data.data[_i]);
                    }

                    $scope.Items = $scope.Items.concat(data.data);
                    itemsIndex += OFFSET;
                    loadingItems = false;             
                }

            }, function(err) {

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

  });
