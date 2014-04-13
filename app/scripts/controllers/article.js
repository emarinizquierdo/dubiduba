'use strict';

angular.module('dubidubaApp')
  .controller('ArticleCtrl', ['$scope', '$http', '$location', '$routeParams', 'Item', function ($scope, $http, $location, $routeParams, Item) {
        $scope.errors = {};
	    $scope.articleData = {}
	    $scope.mainPhoto;
	    $scope.launchOwl = false;

	    Item.get({ id : $routeParams.id },function(article) {

	    	var _i = 0;

	      	$scope.articleData = article;	      	

	      	if($scope.articleData.photos[0]){
	    		$scope.mainPhoto = "http://farm" 
                + $scope.articleData.photos[0].photo.farm 
                + ".staticflickr.com/" 
                + $scope.articleData.photos[0].photo.server + "/" 
                + $scope.articleData.photos[0].photo.id + "_" 
                + $scope.articleData.photos[0].photo.secret + "_z.jpg";
        	}

        	$scope.articleData.photosCarousel = [];
        	$scope.articleData.photosBig = [];

        	for( _i = 0; _i < $scope.articleData.photos.length; _i++ ){

        		$scope.articleData.photosCarousel[_i] = "http://farm" 
                + $scope.articleData.photos[_i].photo.farm 
                + ".staticflickr.com/" 
                + $scope.articleData.photos[_i].photo.server + "/" 
                + $scope.articleData.photos[_i].photo.id + "_" 
                + $scope.articleData.photos[_i].photo.secret + "_s.jpg";

                $scope.articleData.photosBig[_i] = "http://farm" 
                + $scope.articleData.photos[_i].photo.farm 
                + ".staticflickr.com/" 
                + $scope.articleData.photos[_i].photo.server + "/" 
                + $scope.articleData.photos[_i].photo.id + "_" 
                + $scope.articleData.photos[_i].photo.secret + "_z.jpg";
        	}

	    }, function(error){
	    	
	    });

  }]).directive("owlCarousel", function(){
	return {
		restrict: 'A',
		scope : {
			launchOwl : "="
		},
		link: function(scope, element, attrs) {

			scope.$watch('launchOwl', function(p_data){

				if(p_data){

					element.owlCarousel({
						autoPlay: 3000, //Set AutoPlay to 3 seconds
						items : 4,
						itemsDesktop : [1199,3],
						itemsDesktopSmall : [979,3]

					});	
				}
			});			
			
		}
    };	

  });