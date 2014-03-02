'use strict';

angular.module('dubidubaApp')
  .controller('MainCtrl', function ($scope, $http) {
    
  	$scope.items = [];


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
  });
