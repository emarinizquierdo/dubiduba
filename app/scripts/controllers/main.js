'use strict';

angular.module('dubidubaApp')
  .controller('MainCtrl', ['$scope', '$location', '$http', function ($scope, $location, $http) {
    
  	$scope.items = [];


  	$scope.goTo = function( p_route ){
    	$location.path(p_route);
    }

    $http.get('/api/item').success(function(items) {
      $scope.items = items;
      var _i = 0;
      for(_i = 0; _i < items.length; _i++){
      	if(items[_i].photos[0]){
    		$scope.items[_i].mainPhoto = "http://farm" 
            + items[_i].photos[0].photo.farm 
            + ".staticflickr.com/" 
            + items[_i].photos[0].photo.server + "/" 
            + items[_i].photos[0].photo.id + "_" 
            + items[_i].photos[0].photo.secret + "_m.jpg";
    	}
      }
      
    });

    $http.get('/api/maininfo').success(function(maininfo) {
     	$scope.maininfo = maininfo[0];
      	if($scope.maininfo.photos[0]){
    		$scope.maininfo.mainPhoto = "http://farm" 
            + $scope.maininfo.photos[0].photo.farm 
            + ".staticflickr.com/" 
            + $scope.maininfo.photos[0].photo.server + "/" 
            + $scope.maininfo.photos[0].photo.id + "_" 
            + $scope.maininfo.photos[0].photo.secret + "_b.jpg";
    	}      
    });

  }]);
