'use strict';

angular.module('dubidubaApp')
  .directive('imageUploader', function () {
    return {
      templateUrl: 'partials/imageuploader.html',
      restrict: 'A',
      link: function(scope, element, attrs, $q){
        
      },
      controller: function postLink($scope, $element, $q, Flickr) {

      }
    };
  })
  .directive('imageToLoad', function(){
    return {
      templateUrl : 'partials/imageToUpload.html',
      restrict: 'A',
      link: function(scope, element, attrs){

      },
      controller: function($scope, $element, $q, Flickr){

        $scope.loading = false;
        $scope.imageSrc;
        $scope.loaded = $scope.$parent.imagesToLoad[$scope.$index].loaded;
        $scope.errorLoading = false;

        $element.bind('change', function(e){
          
            $scope.$parent.imagesToLoad[$scope.$index + 1] = { loading : false };
            $scope.$parent.imagesLoading += 1;

            var file = e.target.files[0];
            
            $scope.loading = true;

            Flickr.uploadPhoto(file, function(p_data){
              $scope.$parent.imagesToLoad[$scope.$index].photo = p_data.photo;
              $scope.$parent.imagesToLoad[$scope.$index].loaded = true;
              $scope.loading = false;
              $scope.loaded = true;
              $scope.imageSrc = "http://farm" 
                + p_data.photo.farm 
                + ".staticflickr.com/" 
                + p_data.photo.server + "/" 
                + p_data.photo.id + "_" 
                + p_data.photo.secret + "_s.jpg";
                $element.unbind('change');
                $element.find('input').remove();
                $scope.$parent.imagesLoading -= 1;

            },function(p_error){
              $scope.loading = false;
              $scope.loaded = false;
              $scope.$parent.imagesToLoad[$scope.$index].loaded = false;
              $scope.errorLoading = true;
              $element.unbind('change');
              $scope.$parent.imagesLoading -= 1;

            });

          });

        if($scope.loaded){
          $scope.imageSrc = "http://farm" 
          + $scope.$parent.imagesToLoad[$scope.$index].photo.farm 
          + ".staticflickr.com/" 
          + $scope.$parent.imagesToLoad[$scope.$index].photo.server + "/" 
          + $scope.$parent.imagesToLoad[$scope.$index].photo.id + "_" 
          + $scope.$parent.imagesToLoad[$scope.$index].photo.secret + "_s.jpg";
          $element.unbind('change');
          $element.find('input').remove();
        }

        $scope.removePhoto = function(p_index){
          $scope.$parent.imagesToLoad.splice(p_index, 1);
        }
      }
    }
  });