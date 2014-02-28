(function () {
    'use strict';

    angular.module('SampleApplication.Angular.Services', [])
        .service('MessageService', [function () {
            var messages = [];

            return {
                recordMessage: function (message) {
                    messages.push({
                        date: new Date(),
                        msg: message
                    });
                },

                readMessages: function () {
                    // copy array otherwise source could be modified
                    return angular.extend([], messages);
                }
            };
        }])
        .controller('FirstController', ['$scope', 'MessageService', function ($scope, MessageService) {
            $scope.write = function (message) {
                MessageService.recordMessage(message);
            };
        }])
        .controller('SecondController', ['$scope', 'MessageService', function ($scope, MessageService) {
            $scope.messages = [];

            $scope.read = function () {
                $scope.messages = MessageService.readMessages();
            };
        }]);
}());