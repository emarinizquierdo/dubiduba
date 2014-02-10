'use strict';

angular.module('dubidubaApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
