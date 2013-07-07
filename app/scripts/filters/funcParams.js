'use strict';

angular.module('elastularApp')
    .filter('funcParams', function () {

        function getParamNames(func) {
            var funStr = func.toString();
            return funStr.slice(funStr.indexOf('(') + 1, funStr.indexOf(')')).match(/([^\s,]+)/g);
        }

        return function (input) {
//        console.log('input',input);
            return getParamNames(input);
        };
    });
