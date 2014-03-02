'use strict';

angular.module('dubidubaApp')
  .factory('Maininfo', function ($resource) {
    return $resource('/api/maininfo/:id', { id: '@id' },
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
