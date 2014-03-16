'use strict';

angular.module('dubidubaApp')
  .controller('MenunavbarCtrl', function ($scope, $location, $http) {

    function _LoadCategories(){
      $http.get('/api/category').success(function(p_data) {
          if(p_data[0]){
                $scope.categories = p_data[0];
            }else{
                $scope.categories.categories = [{
                    id: new Date().getTime(),
                    name: null,
                    children: []
                }];
            }
        }).error(function(error){
            
        });
    }

    _LoadCategories();

  });
