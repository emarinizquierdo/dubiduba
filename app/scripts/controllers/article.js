'use strict';

angular.module('dubidubaApp')
  .controller('ArticleCtrl', ['$scope', '$http', '$location', '$routeParams', 'Item', function ($scope, $http, $location, $routeParams, Item) {
        $scope.errors = {};
	    $scope.articleData = {}
	    $scope.mainPhoto;

	    $http.get('/api/item/' + $routeParams.id).success(function(article) {
	      	$scope.articleData = article;
	      	if($scope.articleData.photos[0]){
	    		$scope.mainPhoto = "http://farm" 
                + $scope.articleData.photos[0].photo.farm 
                + ".staticflickr.com/" 
                + $scope.articleData.photos[0].photo.server + "/" 
                + $scope.articleData.photos[0].photo.id + "_" 
                + $scope.articleData.photos[0].photo.secret + "_z.jpg";
        	}
	    }).error(function(error){
	    	
	    });
  }]);
