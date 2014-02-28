'use strict';

angular.module('dubidubaApp')
  .directive('imageUploader', function () {
    return {
      templateUrl: 'partials/imageuploader.html',
      restrict: 'A',
      link: function(scope, element, attrs, $q){
        
      },
      controller: function postLink($scope, $element, $q, Flickr) {

        $scope.imagesToLoad = [];
        $scope.imagesToLoad[0] = { loading : false };

      }
    };
  })
  .directive('imageToLoad', function(){
    return {
      templateUrl : 'partials/imageToUpload.html',
      restrict: 'A',
      scope: {
        imagesToLoad : "="
      },
      link: function(scope, element, attrs){

      },
      controller: function($scope, $element, $q, Flickr){

        $scope.loading = false;
        $scope.imageSrc;
        $scope.imageLoaded = false;
        $scope.errorLoading = false;

        var _actualImageIndex = $scope.imagesToLoad.length;

        $element.bind('change', function(e){
          
            $scope.imagesToLoad[_actualImageIndex] = { loading : false };

            var file = e.target.files[0];
            
            $scope.loading = true;

            Flickr.uploadPhoto(file, function(p_data){
              $scope.imagesToLoad[_actualImageIndex].photo = p_data.photo;
              $scope.imagesToLoad[_actualImageIndex].loaded = true;
              $scope.loading = false;
              $scope.loaded = true;
              $scope.imageSrc = "http://farm" 
                + p_data.photo.farm 
                + ".staticflickr.com/" 
                + p_data.photo.server + "/" 
                + p_data.photo.id + "_" 
                + p_data.photo.secret + "_s.jpg";
            },function(p_error){
              $scope.loading = false;
              $scope.loaded = false;
              $scope.imagesToLoad[_actualImageIndex].loaded = false;
              $scope.errorLoading = true;
              $element.unbind('change');
            });

          });
      }
    }
  });