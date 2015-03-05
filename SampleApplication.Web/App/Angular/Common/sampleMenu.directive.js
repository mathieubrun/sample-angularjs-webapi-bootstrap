(function () {
    'use strict';

    angular
        .module('SampleApplication.Common')
        .directive('sampleMenu', directive);

    directive.$inject = [];

    function directive() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'app/angular/common/menu.html'
        };
    }
}());