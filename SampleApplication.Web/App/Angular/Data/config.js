(function () {
    'use strict';

    angular
        .module('SampleApplication.Angular.Data')
        .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
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
        }]);
}());