'use strict';

angular.module('dubidubaApp')
  .controller('ArticleAdminCtrl', function ($scope, $http, Item) {
  	$scope.errors = {};
    $scope.articleData = {}

    $http.get('/api/item').success(function(items) {
      $scope.items = items;
    });
    
  	$scope.newArticle = function(p_data){
        return Item.create(p_data);
    }

});