'use strict';

angular.module('dubidubaApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/item').success(function(items) {
      $scope.items = items;
    });
  });
