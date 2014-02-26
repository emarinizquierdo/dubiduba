'use strict';

angular.module('dubidubaApp')
  .service('Flickr', ['$http', function Flickr($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
	    uploadPhoto : function(p_file, p_success, p_error){

            var fd = new FormData();
            fd.append('file', p_file);

            $http.post('/flickr',fd,{
                headers:{
                    'Content-Type': p_file.type
                },
                transformRequest:angular.identity
            })
            .success(function(){
            })
            .error(function(){
            });

        }    
    }
}]);

