(function () {
    'use strict';

    angular
        .module('SampleApplication.Angular.Services')
        .controller('SecondController', controller);

    controller.$inject = ['$scope', 'messages'];

    function controller($scope, messages) {
        $scope.msgs = [];

        $scope.read = function () {
            $scope.msgs = messages.readMessages();
        };
    }
}());