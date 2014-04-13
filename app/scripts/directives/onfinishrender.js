'use strict';

angular.module('dubidubaApp')

/**
* Removes server error when user updates input
*/
.directive('onFinishRender', function () {
    return {
        restrict: 'A',
        scope : false,
        link: function (scope, element, attr) {

            if (scope.$last === true) {
                element.ready(function () {
                    scope.$parent.launchOwl = true;
                });
            }
        }
    }
});