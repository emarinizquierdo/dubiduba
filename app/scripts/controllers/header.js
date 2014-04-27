'use strict';

angular.module('dubidubaApp')
.controller('HeaderCtrl', function ($scope, $http, $routeParams, breadcrumbs) {
    
    $scope.breadcrumbs = breadcrumbs;

});