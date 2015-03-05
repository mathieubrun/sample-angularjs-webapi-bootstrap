(function () {
    'use strict';

    angular
        .module('SampleApplication.Angular.Directives')
        .controller('DirectivesController', controller);

    controller.$inject = ['$scope'];

    function controller($scope) {
        $scope.text = "from outside directive";

        $scope.count = function (value) {
            console.log("Counted " + value);
        };
    }
}());