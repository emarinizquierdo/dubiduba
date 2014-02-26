'use strict';

angular.module('dubidubaApp')
  .directive('imageUploader', function () {
    return {
      templateUrl: 'partials/imageuploader.html',
      restrict: 'A',
      link: function(scope, element, attrs, $q){
        
      },
      controller: function postLink($scope, $element, $q, Flickr) {

        $scope.imagesToLoad= [];
        $scope.imagesToLoad[0] = { loading : false };

        $element.bind('change', function(e){
          
          var file = e.target.files[0];
          console.log('file is ' + JSON.stringify(file));
          
          Flickr.uploadPhoto(file);

        });

      }
    };
  });