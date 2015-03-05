(function () {
    'use strict';

    angular
        .module('SampleApplication.Angular.Loader')
        .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
            $routeProvider.when(
                '/angular/loader',
                {
                    templateUrl: '/app/angular/loader/index.html',
                    controller: 'LoaderController'
                }
            );
        }]);
}());