'use strict';

angular.module('dubidubaApp')
  .controller('AdminCtrl', ['$scope', '$http', '$routeParams', '$cookieStore', 'Auth', function ($scope, $http, $routeParams, $cookieStore, Auth) {

  	$http.get('/api/maininfo').success(function(maininfo) {
	    $scope.maininfo = maininfo[0];
	});

  }]);
