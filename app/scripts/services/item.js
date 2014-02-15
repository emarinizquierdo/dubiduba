'use strict';

angular.module('dubidubaApp')
  .factory('Item', function ($resource) {
    return $resource('/api/item/:id', { id: '@id' },
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
      }
	  });
  });
