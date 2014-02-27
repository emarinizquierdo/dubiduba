'use strict';

angular.module('dubidubaApp')
  .service('Flickr', ['$http', '$upload', function Flickr($http, $upload) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
	    uploadPhoto : function(p_file, p_success, p_error){

            $upload.upload({
                url: '/flickr',
                method: 'POST',
                file: p_file
            }).progress(function(evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function(data, status, headers, config) {
                // file is uploaded successfully
                console.log(data);
            });

        }

    }

}]);