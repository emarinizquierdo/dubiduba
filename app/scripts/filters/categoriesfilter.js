'use strict';

angular.module('dubidubaApp')
  .filter('categoriesFilter', function () {
    return function (input, filter) {

    	var _Output = [],
    		_i = 0;

    	for(_i = 0; _i < input.length; _i++){

    		if((filter.indexOf(input[_i].category) >=0) || (filter.indexOf(input[_i].subcategory)  >=0)){
    			_Output.push(input[_i]);
    		}
    	}
    
      if(filter.length == 0){
      	return input;
      }else{
      	return _Output;
      }
      
    };
  });
