(function () {
    'use strict';

    angular.module('SampleApplication.Common', ['ngResource'])
        .directive('sampleMenu', [function () {
            return {
                restrict: 'EA',
                replace: true,
                templateUrl: '/app/common/menu.html'
            };
        }])
        .directive('showSource', ['$resource', function ($resource) {
            return {
                template: '<pre>{{file.Content}}</pre>',
                restrict: 'EA',
                replace: true,
                link: function (scope, elem, attrs) {
                    var res = $resource('/api/source');

                    attrs.$observe('url', function (value) {
                        if (value) {
                            scope.file = res.get({ path: value });
                        }
                    });
                }
            };
        }]);
}());