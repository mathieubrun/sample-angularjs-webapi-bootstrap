(function () {
    'use strict';

    angular
        .module('SampleApplication.Angular.Directives')
        .directive('scoping', directive);

    directive.$inject = [];

    function directive() {
        return {
            template: '<p>From directive (isolated scope) : <em>{{text}}</em></p>',
            scope: {
            },
            link: function (scope, elem, attrs, controller, transcludeFn) {
                scope.text = "set inside directive"
            }
        };
    }
}());