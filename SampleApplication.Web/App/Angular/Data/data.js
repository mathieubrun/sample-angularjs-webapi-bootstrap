(function () {
    'use strict';

    angular.module('SampleApplication.Angular.Data', ['ngResource', 'ngRoute'])
        .controller('DatasController', ['$scope', '$resource', function ($scope, $resource) {
            var clients = $resource("api/clients");

            $scope.reload = function () {
                $scope.data = clients.query();
            };

            $scope.reload();
        }])
        .controller('DataController', ['$scope', '$resource', '$routeParams', '$location', function ($scope, $resource, $routeParams, $location) {
            var clients = $resource("api/clients/:id", { id: '@id' }),
                recommandations = $resource("api/recommandations");

            $scope.recommandations = recommandations.query();

            $scope.data = clients.get({ id: $routeParams.id }, function (success) {
                $scope.recommandations.$promise.then(function () {
                    _.each(success.Recommandations, function (reco) {
                        _.find($scope.recommandations, function (r) {
                            return r.Id === reco.Id;
                        }).Checked = true;
                    });
                });
            });

            $scope.newData = {};

            $scope.model = {
                IsEditing: false
            };

            $scope.edit = function () {
                $scope.model.IsEditing = true;
                $scope.newData = angular.extend({}, $scope.data);
            };

            $scope.$watch('recommandations', function (newval, oldval) {
                if (newval !== oldval) {
                    $scope.newData.Recommandations = _.filter($scope.recommandations, function (r) { return r.Checked; });
                }
            }, true);

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
        }]);
}());