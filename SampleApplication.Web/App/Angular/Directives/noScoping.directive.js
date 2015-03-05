(function () {
    'use strict';

    angular
        .module('SampleApplication.Angular.Directives')
        .directive('noScoping', directive);

    directive.$inject = [];

    function directive() {
        return {
            template: '<p>From directive (no scope) : <em>{{text}}</em></p>'
        };
    }
}());