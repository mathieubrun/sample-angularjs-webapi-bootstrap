(function () {
    'use strict';

    angular
        .module('SampleApplication')
        .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

            $routeProvider.when(
                '/home',
                {
                    templateUrl: '/app/index.html'
                }
            );

            $routeProvider.otherwise({
                redirectTo: '/home'
            });
        }]);
}());