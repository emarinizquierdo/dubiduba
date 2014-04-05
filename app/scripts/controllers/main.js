'use strict';

angular.module('dubidubaApp')
  .controller('MainCtrl', ['$scope', '$location', '$http', 'Item', 'Favourite', function ($scope, $location, $http, Item, Favourite) {
    
  	$scope.groupedItems = [];
    $scope.favouritesItems = [];
    $scope.maininfo;
    
    $scope.carouselInterval = 5000;

  	$scope.goTo = function( p_route ){
    	$location.path(p_route);
    }

    function ProcessItems( p_data, p_groupedItems ){


      var _i;

      for( _i = 0; _i < (p_data.length / 2); _i++){
        
        if( ( (_i * 2) +1) < p_data.length ){
          p_groupedItems[_i] = [];

          p_groupedItems[_i][0] = p_data[(_i * 2)];
          if(p_data[(_i * 2)].photos.length > 0 ){
              p_groupedItems[_i][0].mainPhoto = "http://farm" 
            + p_data[(_i * 2)].photos[0].photo.farm 
            + ".staticflickr.com/" 
            + p_data[(_i * 2)].photos[0].photo.server + "/" 
            + p_data[(_i * 2)].photos[0].photo.id + "_" 
            + p_data[(_i * 2)].photos[0].photo.secret + "_z.jpg";
          }

          p_groupedItems[_i][1] = p_data[(_i * 2)+1];
          if(p_data[(_i * 2)+1].photos.length > 0 ){
              p_groupedItems[_i][1].mainPhoto = "http://farm" 
            + p_data[(_i * 2)+1].photos[0].photo.farm 
            + ".staticflickr.com/" 
            + p_data[(_i * 2)+1].photos[0].photo.server + "/" 
            + p_data[(_i * 2)+1].photos[0].photo.id + "_" 
            + p_data[(_i * 2)+1].photos[0].photo.secret + "_z.jpg";
          }
        }
      }
    }

    function ProcessMaininfo( p_data ){

      $scope.maininfo = p_data[0] || {};
      $scope.maininfo.mainPhoto = [];
      
        if($scope.maininfo && $scope.maininfo.photos){
          var _i;
          for( _i = 0; _i < $scope.maininfo.photos.length; _i++ ){
            $scope.maininfo.mainPhoto[_i] = "http://farm" 
            + $scope.maininfo.photos[_i].photo.farm 
            + ".staticflickr.com/" 
            + $scope.maininfo.photos[_i].photo.server + "/" 
            + $scope.maininfo.photos[_i].photo.id + "_" 
            + $scope.maininfo.photos[_i].photo.secret + "_b.jpg";
          }       
      }

    }

    Item.get({
        'cursor' : 0
      , 'numItems' : 10
    },function(data) {  
      ProcessItems(data.data, $scope.groupedItems);      
    },function(error){

    });

    Favourite.get({
        'cursor' : 0
      , 'numItems' : 10
    },function(data) {  
      ProcessItems(data.data, $scope.favouritesItems);      
    },function(error){

    });

    $http.get('/api/maininfo').success(function(maininfo) {
      ProcessMaininfo(maininfo); 
    });

  }]);
