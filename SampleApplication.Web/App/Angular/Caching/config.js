(function () {
    'use strict';

    angular
        .module('SampleApplication.Angular.Caching')
        .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
            $routeProvider.when(
                '/angular/caching',
                {
                    templateUrl: '/app/angular/caching/index.html'
                }
            );

            $httpProvider.interceptors.push('smartCacheInterceptor');
        }]);
}());