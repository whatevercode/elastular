'use strict';

angular.module('elastularApp', ['elasticjs.service','ui.ace','ngResource'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/search', {
                templateUrl: 'views/search.html',
                controller: 'SearchCtrl'
            })
            .when('/explore', {
                templateUrl: 'views/explore.html',
                controller: 'ExploreCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
