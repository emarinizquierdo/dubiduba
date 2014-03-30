'use strict';

angular.module('dubidubaApp')
  .controller('ArticleadminCtrl', ['$scope', '$http', '$routeParams', '$cookieStore', 'Auth', function ($scope, $http, $routeParams, $cookieStore, Auth) {



	$scope.tabs = [
	    { title:"Artículos", url:"partials/admin/article.html" },
	    { title:"Categorías", url:"partials/admin/categories.html" },
	    { title:"Stock", url:"partials/admin/stock.html", disabled:true},
  	];


  }]);