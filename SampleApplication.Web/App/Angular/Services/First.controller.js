(function () {
    'use strict';

    angular
        .module('SampleApplication.Angular.Services')
        .controller('FirstController', controller);

    controller.$inject = ['$scope', 'messages'];

    function controller($scope, messages) {
        $scope.write = function (message) {
            messages.recordMessage(message);
        };
    }
}());