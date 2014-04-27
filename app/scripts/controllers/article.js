'use strict';

angular.module('dubidubaApp')
  .controller('ArticleCtrl', ['$scope', '$http', '$location', '$routeParams', 'Item', function ($scope, $http, $location, $routeParams, Item) {
        $scope.loading=false;
        $scope.errors = {};
	    $scope.articleData = {}
	    $scope.mainPhoto;
	    $scope.launchOwl = false;
	    $scope.sizeSelected = false;
	    $scope.itemQuantity = 0;
	    $scope.indexSize;

	    var _checkStock = function(){
	    	var   _items = simpleCart.items()
	    		, _i = 0
	    		, _j = 0
	    		;

	    	for( _i=0; _i < _items.length; _i++ ){
				for(_j = 0; _j < $scope.articleData.stock.length; _j++){
					if($scope.articleData.stock[_j].size._id == _items[_i].options().idsize){
						$scope.articleData.stock[_j].amount -= _items[_i].quantity();
					}
				}
	    	}

	    	$scope.loading = false;

	    }

	    $scope.mainPhotoChanger = function( p_data ){
	    	$scope.mainPhoto = p_data;
	    };

	    $scope.setActiveSize = function( p_index ){

	    	var _i = 0;
	    	for(_i=0; _i < $scope.articleData.stock.length; _i++){
	    		$scope.articleData.stock[_i].active = false;
	    	}

	    	if($scope.articleData.stock[p_index].amount > 0 ){
	    		$scope.articleData.stock[p_index].active = true;
	    		$scope.sizeSelected = $scope.articleData.stock[p_index];
	    		$scope.itemQuantity = 0;
	    		$scope.indexSize = p_index;	
	    	}else{
	    		$scope.sizeSelected = false;
	    		$scope.indexSize = null;
	    	}	    	
	    }

	    $scope.loading = true;

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
                $scope.cartPhoto = "http://farm" 
                + $scope.articleData.photos[0].photo.farm 
                + ".staticflickr.com/" 
                + $scope.articleData.photos[0].photo.server + "/" 
                + $scope.articleData.photos[0].photo.id + "_" 
                + $scope.articleData.photos[0].photo.secret + "_q.jpg";
        	}

        	$scope.articleData.photosCarousel = [];
        	$scope.articleData.photosBig = [];

        	for( _i = 0; _i < $scope.articleData.photos.length; _i++ ){

        		$scope.articleData.photosCarousel[_i] = "http://farm" 
                + $scope.articleData.photos[_i].photo.farm 
                + ".staticflickr.com/" 
                + $scope.articleData.photos[_i].photo.server + "/" 
                + $scope.articleData.photos[_i].photo.id + "_" 
                + $scope.articleData.photos[_i].photo.secret + "_q.jpg";

                $scope.articleData.photosBig[_i] = "http://farm" 
                + $scope.articleData.photos[_i].photo.farm 
                + ".staticflickr.com/" 
                + $scope.articleData.photos[_i].photo.server + "/" 
                + $scope.articleData.photos[_i].photo.id + "_" 
                + $scope.articleData.photos[_i].photo.secret + "_z.jpg";
        	}

        	_checkStock();

	    }, function(error){
	    	
	    });

		simpleCart.bind( 'beforeAdd' , function( item ){
			console.log( item.get('name') ); 
			console.log( item.get('index') ); 
			var _i = 0;
			for(_i = 0; _i < $scope.articleData.stock.length; _i++){
				if($scope.articleData.stock[_i].size._id == item.options().idsize){
					$scope.articleData.stock[_i].amount -= item.quantity();
					$scope.itemQuantity -= item.quantity();
					if(!$scope.$phase){
						$scope.$apply();
					}
				}
			}
		});

		$('.add-to-cart').click(function(){

			var cart = $('.shopping_bg');
			var imgtofly = $(this).parents('.article-view').find('.article-image-content .img-responsive').eq(0);

			if (imgtofly) { 
				var imgclone = imgtofly.clone().offset({ 
					top:imgtofly.offset().top,
					left:imgtofly.offset().left
				}).css({
					'opacity':'0.7',
					'position':'absolute',
					'width':'150px',
					'z-index':'1000'
				}).appendTo($('body')).animate({
					'top':cart.offset().top + 5,
					'left':cart.offset().left + 10,
					'width':55,
				}, 500);

				imgclone.animate({'width':0, 'height':0},
					function(){ $(this).detach() });
			}

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
						itemsCustom : [
					        [0, 5],
					        [450, 5],
					        [600, 7],
					        [700, 6]
					    ]
					});	
				}
			});			
			
		}
    };	

  });