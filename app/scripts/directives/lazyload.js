'use strict';

angular.module('dubidubaApp')
.directive('lazyloadimage', function () {
  return {
    restrict: 'A',
    scope : {
      source : "="
    },
    link: function(scope, element, attrs) {   

          scope.$watch('source',function(n,o){
            element.parent().height(element.parent().height());
            element.fadeOut(100);
          });

          element.bind("load" , function(e){
            element.parent().height(element.height());
            setTimeout(function(){              
              angular.element(e.target).fadeIn();      
            },100);                   
          });

          element.bind("error", function(e){
          	angular.element(e.target).show();
          })

      }
  };
});