'use strict';

angular.module('dubidubaApp')
  .controller('MainCtrl', ['$scope', '$location', '$http', 'Item', function ($scope, $location, $http, Item) {
    
  	$scope.groupedItems = [];
    $scope.maininfo;
    
    $scope.carouselInterval = 5000;

  	$scope.goTo = function( p_route ){
    	$location.path(p_route);
    }

    function ProcessItems( p_data ){

      $scope.groupedItems = [];
      var _i;

      for( _i = 0; _i < (p_data.length / 2); _i++){
        
        if( ( (_i * 2) +1) < p_data.length ){
          $scope.groupedItems[_i] = [];

          $scope.groupedItems[_i][0] = p_data[(_i * 2)];
          if(p_data[(_i * 2)].photos.length > 0 ){
              $scope.groupedItems[_i][0].mainPhoto = "http://farm" 
            + p_data[(_i * 2)].photos[0].photo.farm 
            + ".staticflickr.com/" 
            + p_data[(_i * 2)].photos[0].photo.server + "/" 
            + p_data[(_i * 2)].photos[0].photo.id + "_" 
            + p_data[(_i * 2)].photos[0].photo.secret + "_m.jpg";
          }

          $scope.groupedItems[_i][1] = p_data[(_i * 2)+1];
          if(p_data[(_i * 2)+1].photos.length > 0 ){
              $scope.groupedItems[_i][1].mainPhoto = "http://farm" 
            + p_data[(_i * 2)+1].photos[0].photo.farm 
            + ".staticflickr.com/" 
            + p_data[(_i * 2)+1].photos[0].photo.server + "/" 
            + p_data[(_i * 2)+1].photos[0].photo.id + "_" 
            + p_data[(_i * 2)+1].photos[0].photo.secret + "_m.jpg";
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

    Item.get({},function(data) {  
      ProcessItems(data.data);      
    },function(error){
    });

    $http.get('/api/maininfo').success(function(maininfo) {
      ProcessMaininfo(maininfo); 
    });

  }]);
