(function () {
    'use strict';

    angular
        .module('SampleApplication.Angular.Services')
        .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
            $routeProvider.when(
                '/angular/services',
                {
                    templateUrl: '/app/angular/services/index.html'
                }
            );
        }]);
}());