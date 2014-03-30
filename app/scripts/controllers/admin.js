'use strict';

angular.module('dubidubaApp')
  .controller('AdminCtrl', ['$scope', '$http', '$routeParams', '$cookieStore', 'Auth', function ($scope, $http, $routeParams, $cookieStore, Auth) {



	$scope.tabs = [
	    { title:"Artículos", url:"partials/admin/articleadmin.html" },
	    { title:"Usuarios", url:"partials/admin/article.html", disabled:true},
	    { title:"Portada", url:"partials/admin/maininfo/edit.html" },
  	];


  }]);