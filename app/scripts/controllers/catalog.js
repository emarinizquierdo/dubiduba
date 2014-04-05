'use strict';

angular.module('dubidubaApp')
  .controller('CatalogCtrl', function ($scope, $http, $location, $routeParams, Item) {
    
    var   totalReaded = false
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

    function _ProcessItems( p_data ){

      $scope.Items = p_data || [];
      
      var _i;
      for( _i = 0; _i < $scope.Items.length; _i++ ){
        if($scope.Items[_i].photos.length > 0){
              $scope.Items[_i].mainPhoto = "http://farm" 
            + $scope.Items[_i].photos[0].photo.farm 
            + ".staticflickr.com/" 
            + $scope.Items[_i].photos[0].photo.server + "/" 
            + $scope.Items[_i].photos[0].photo.id + "_" 
            + $scope.Items[_i].photos[0].photo.secret + "_b.jpg";
        }
      }
    }

    $scope.LoadCatalog = function(){

    	if($routeParams.id && !totalReaded){

            Item.get({
                  'category' : $routeParams.id
                , 'cursor' : itemsIndex || 0
                , 'numItems' : OFFSET

            }, function(data) {

                if(data && data.data){
                    if( itemsIndex + OFFSET > data.total){
                        totalReaded = true;
                    }

                    $scope.Items = $scope.Items.concat(data.data);
                    itemsIndex += OFFSET;
                    _ProcessItems($scope.Items);                    
                }

            }, function(err) {

            });    

        }else if(!totalReaded){

            Item.get({
                  'category' : $routeParams.id
                , 'cursor' : itemsIndex || 0
                , 'numItems' : OFFSET
            }, function(data) {

                if(data && data.data){
                    if( itemsIndex + OFFSET > data.total){
                        totalReaded = true;
                    }

                    $scope.Items = $scope.Items.concat(data.data);
                    itemsIndex += OFFSET;
                    _ProcessItems($scope.Items);                    
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
