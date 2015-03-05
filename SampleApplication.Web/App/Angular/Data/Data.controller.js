(function () {
    'use strict';

    angular
        .module('SampleApplication.Angular.Data')
        .controller('DataController', controller);

    controller.$inject = ['$scope', '$resource', '$routeParams', '$location'];

    function controller($scope, $resource, $routeParams, $location) {
        var clients = $resource("api/clients/:id", { id: '@id' }),
                recommandations = $resource("api/recommandations");

        $scope.recommandations = recommandations.query();

        $scope.data = clients.get({ id: $routeParams.id });

        $scope.newData = {};

        $scope.model = {
            IsEditing: false
        };

        $scope.edit = function () {
            $scope.model.IsEditing = true;
            $scope.newData = angular.extend({}, $scope.data);
        };

        $scope.save = function () {
            clients.save($scope.newData, function (res) {
                $scope.model.IsEditing = false;
                $scope.data = res;
            }, function (err) {
                $scope.errors = err.data;
            });
        };

        $scope.cancel = function () {
            $scope.model.IsEditing = false;
        };

        $scope.back = function () {
            $location.path('/angular/data/remote');
        };
    }
}());