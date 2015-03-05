(function () {
    'use strict';

    angular
        .module('SampleApplication.Angular.Directives')
        .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
            $routeProvider.when(
                '/angular/directives',
                {
                    controller: 'DirectivesController',
                    templateUrl: '/app/angular/directives/index.html'
                }
            );
        }]);
}());