'use strict';

angular.module('dubidubaApp')
  .factory('Category', function ($resource) {
    return $resource('/api/category/:id', { id: '@id' },
    { //parameters default
      create: {
        method: 'POST'
      },
      update: {
        method: 'PUT'
      },
      get: {
        method: 'GET',
        params: {
        }
      },
      delete: {
        method: 'DELETE'
      }
	  });
  });
