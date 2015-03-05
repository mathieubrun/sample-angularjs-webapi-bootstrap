(function () {
    'use strict';

    angular
        .module('SampleApplication.Angular.Directives')
        .directive('numbersSimple', directive);

    directive.$inject = [];

    function directive() {
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
    }
}());