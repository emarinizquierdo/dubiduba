'use strict';

angular.module('dubidubaApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

    $scope.menu = [{
      'title': 'Administración',
      'link': '/admin'
    }];

    $scope.hasSession = false;

    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.isAdmin = Auth.isAdminLoggedIn;

  });
