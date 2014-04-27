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
        method: 'GET'
      },
      delete: {
        method: 'DELETE'
      }
	  });
  }).factory('Stocks', function ($resource) {
    return $resource('/api/item/stocks', {},
    { //parameters default
      update: {
        method: 'PUT'
      }
    });
  }).factory('Favourite', function ($resource) {
    return $resource('/api/favourites/', {},
    { //parameters default
      get: {
        method: 'GET'
      }
    });
  }).factory('ItemSearch', function ($resource) {
    return $resource('/api/search/', {},
    { //parameters default
      get: {
        method: 'GET'
      }
    });
  });