(function () {
    'use strict';

    angular.module('SampleApplication.Angular.Loader', ['ngResource']);

    angular.module('SampleApplication.Angular.Loader')
        .controller('LoaderController', ['$scope', '$resource', function ($scope, $resource) {
            var clientsDelayed = $resource("api/clients/delay"),
                clientsError = $resource("api/clients/error/:error");

            $scope.reload = function () {
                $scope.dataDelayed = clientsDelayed.query();
                $scope.dataError400 = clientsError.query({ error: 400 });
                $scope.dataError500 = clientsError.query({ error: 500 });
            };

            $scope.reload();
        }]);
}());