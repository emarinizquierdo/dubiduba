'use strict';

angular.module('dubidubaApp')
.controller('AdminMaininfoEditCtrl', ['$scope', '$http', '$routeParams', '$location', 'Maininfo', function ($scope, $http, $routeParams, $location, Maininfo) {
	
	$scope.errors = {};
    $scope.maininfoData = {}
    $scope.imagesLoading = 0;
    $scope.tinyMCE = false;
   
    function _Init(){
        $scope.imagesToLoad = $scope.maininfoData.photos;
        $scope.imagesToLoad[$scope.imagesToLoad.length] = {loading : false};
        $scope.tinyMCE = true;
    }

    $scope.goTo = function( p_route ){
		$location.path(p_route);
	}

  	$scope.saveArticle = function(p_data){

        if($scope.imagesToLoad.length > 0){
            var _i = 0;
            for(_i = 0; _i < $scope.imagesToLoad.length; _i++){
                if(!$scope.imagesToLoad[_i].loaded){
                    $scope.imagesToLoad.splice(_i, 1);
                }
            }
            p_data.photos = $scope.imagesToLoad;
        }

        if($routeParams.id || p_data._id){
            Maininfo.update(p_data, _OnSuccess, _OnError);
        }else{
            Maininfo.create(p_data, _OnSuccess, _OnError); 
        }
        
    }

    function _OnSuccess(){
    	$location.path("/admin");
    }

    function _OnError( err ){
    	 $scope.errors.other = err.message;
    }

    if($routeParams.id){
        $http.get('/api/maininfo/' + $routeParams.id).success(function(maininfo) {
        $scope.maininfoData = maininfo;
          _Init();
        }).error(function(error){
            
        });
    }else{
        $http.get('/api/maininfo').success(function(maininfo) {
            $scope.maininfoData = maininfo[0];          
            if($scope.maininfoData){
                _Init();
            }else{
                $scope.imagesToLoad =[];
                $scope.imagesToLoad[0] = {loading : false};
            }
        }).error(function(error){
            
        });
        
    }

}]);