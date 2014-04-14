(function () {
    'use strict';

    angular.module('SampleApplication.Angular.Directives', [])
        .controller('DirectivesController', ['$scope', function ($scope) {
            $scope.text = "from outside directive";

            $scope.count = function (value) {
                console.log("Counted " + value);
            };
        }])
        .directive('noScoping', [function () {
            return {
                template: '<p>From directive (no scope) : <em>{{text}}</em></p>'
            };
        }])
        .directive('scoping', [function () {
            return {
                template: '<p>From directive (isolated scope) : <em>{{text}}</em></p>',
                scope: {
                },
                link: function (scope, elem, attrs, controller, transcludeFn) {
                    scope.text = "set inside directive"
                }
            };
        }])
        .directive('numbersSimple', [function () {
            return {
                scope: {
                    // two way binding
                    start: '=',
                    // one way attribute binding
                    count: '@',
                    // callback
                    onCount: '&',
                },
                link: function (scope, elem, attrs, controller, transcludeFn) {
                    scope.$watch("start", function (value) {

                        jQuery(elem).empty();

                        if (value > 0) {

                            for (var i = 0; i < scope.count; i++) {

                                jQuery(elem).append(i + value);

                                if (i < scope.count - 1) {
                                    jQuery(elem).append("-");
                                }

                                // here the parameter "value" is passed to the callback
                                // this requires that the callback is declared like this : on-count="whatever(value)"
                                scope.onCount({ value: i + value });
                            }
                        }
                    });
                }
            };
        }])
        .directive('transclusion', [function () {
            return {
                transclude: true,
                scope: {
                },
                template: '<p>From directive (isolated scope) : <em>{{text}}</em><p ng-transclude></p>',
                link: function (scope, elem, attrs, controller, transcludeFn) {
                    scope.text = "set inside directive"
                }
            };
        }]);
}());