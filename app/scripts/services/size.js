'use strict';

angular.module('dubidubaApp')
.factory('Size', function ($resource) {
return $resource('/api/size/:id', { id: '@id' },
{ //parameters default
  create: {
    method: 'POST'
  },
  update: {
    method: 'PUT'
  },
  get: {
      method: 'GET'
    , isArray: true
  },
  delete: {
    method: 'DELETE'
  }
  });
});
