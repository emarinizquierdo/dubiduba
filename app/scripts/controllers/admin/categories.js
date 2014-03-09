'use strict';

angular.module('dubidubaApp')
  .controller('AdminCategoriesCtrl', function ($scope, $http, Category ) {
    
    var _existCategories = false;

    $scope.categories = {};
  	$scope.isCollapsed = true;  

  	$scope.saveCategories = function( p_removeId ){

        if(_existCategories){
            var _updateData = $scope.categories;
            _updateData.removeId = p_removeId;
            Category.update( _updateData, _OnSuccess, _OnError); 
        }else{
            Category.create($scope.categories, _OnSuccess, _OnError); 
        }

    }

    function _OnSuccess(){
    	_LoadCategories();
    }

    function _OnError(){

    }

    function _LoadCategories(){
    	$http.get('/api/category').success(function(p_data) {
        	if(p_data[0]){
                _existCategories = true;
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

    $scope.nestedOptions = {
        orderChanged: function(scope, sourceItem, sourceIndex, destIndex) {
            $scope.saveCategories();
        },
        itemMoved: function(sourceScope, modelData, sourceIndex, destScope, destIndex) {
            $scope.saveCategories();
        }
    };

    $scope.catchEnter = function(ev) {
        if (ev.which==13){
            $scope.saveCategories();
        }
    }

    $scope.toggle = function(scope) {
      scope.collapsed = !scope.collapsed;
    };

    $scope.newSubCategory = function( scope ) {
        var categoryItem = scope.category;
        categoryItem.children.push({
            id: new Date().getTime(),
            name: null,
            children: []
        });
    };

    $scope.newCategory = function( scope ) {
        $scope.categories.categories.push({
            id: new Date().getTime(),
            name: null,
            children: []
        });
    };

    $scope.removeCategories = function(scope) {
      //scope.removeItem();
      var index = scope.$index;
      if (index > -1) {
        scope.sortableModelValue.splice(index, 1)[0];
      }
      $scope.saveCategories( scope.category.id );
    };

    _LoadCategories();

  });
