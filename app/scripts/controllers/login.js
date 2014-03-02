'use strict';

angular.module('dubidubaApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;
      
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function( p_user ) {
          if(p_user.role == 'admin'){
            $location.path("/admin");
          }
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors.other = err.message;
        });
      }
    };
  });