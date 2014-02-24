'use strict';

angular.module('SampleApplication.Angular.Loader')
    .directive('loader', [function () {
        return {
            transclude: true,
            templateUrl: 'app/angular/loader/loader.html',
            scope: {
                source: '=loader'
            },
            link: function (scope, elem, attrs) {
                scope.status = 200;

                scope.$watch("source", function (val) {
                    if (val && val.$promise) {
                        scope.status = 0;
                        val.$promise.then(function (success) {
                            scope.status = 200;
                        }, function (err) {
                            scope.status = err.status;
                        });
                    }
                    else {
                        scope.status = 200;
                    }
                });
            }
        }
    }])
;