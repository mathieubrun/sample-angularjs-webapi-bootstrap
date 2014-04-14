(function () {
    'use strict';

    /*
    This is an Angular module, which will represent our application
    */
    angular.module('SampleApplication', [
        'ngResource',
        'ngRoute',
        'ui.date',
        'ui.bootstrap.tabs',
        'ui.bootstrap.dropdownToggle',
        'SampleApplication.Angular.Caching',
        'SampleApplication.Common',
        'SampleApplication.Config',
        'SampleApplication.Angular.Data',
        'SampleApplication.Angular.Directives',
        'SampleApplication.Angular.Services',
        'SampleApplication.Angular.Loader'
    ])
        .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

            $routeProvider.when(
                '/home',
                {
                    templateUrl: '/app/index.html'
                }
            );

            $routeProvider.when(
                '/angular/caching',
                {
                    templateUrl: '/app/angular/caching/index.html'
                }
            );

            $routeProvider.when(
                '/angular/directives',
                {
                    controller: 'DirectivesController',
                    templateUrl: '/app/angular/directives/index.html'
                }
            );

            $routeProvider.when(
                '/angular/data/remote',
                {
                    templateUrl: '/app/angular/data/index.html',
                    controller: 'DatasController'
                }
            );

            $routeProvider.when(
                '/angular/data/remote/:id',
                {
                    templateUrl: '/app/angular/data/detail.html',
                    controller: 'DataController'
                }
            );

            $routeProvider.when(
                '/angular/loader',
                {
                    templateUrl: '/app/angular/loader/index.html',
                    controller: 'LoaderController'
                }
            );

            $routeProvider.when(
                '/angular/services',
                {
                    templateUrl: '/app/angular/services/index.html'
                }
            );

            $routeProvider.when(
                '/webapi/filters',
                {
                    templateUrl: '/app/webapi/filters.html',
                    controller: ['$scope', '$http', function ($scope, $http) {
                        $scope.get = function (url) {
                            $http.get(url);
                        };

                        $scope.post = function (url, data) {
                            $http.post(url, data);
                        };
                    }]
                }
            );

            $routeProvider.otherwise({
                redirectTo: '/home'
            });

            $httpProvider.interceptors.push('SmartCacheInterceptor');
        }]);
}());