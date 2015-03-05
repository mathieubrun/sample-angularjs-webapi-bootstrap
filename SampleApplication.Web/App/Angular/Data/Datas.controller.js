
(function () {
    'use strict';

    angular
        .module('SampleApplication.Angular.Data')
        .controller('DatasController', controller);

    controller.$inject = ['$scope', '$resource'];

    function controller($scope, $resource) {
        var clients = $resource("api/clients");

        $scope.reload = function () {
            $scope.data = clients.query();
        };

        $scope.reload();
    }
}());
