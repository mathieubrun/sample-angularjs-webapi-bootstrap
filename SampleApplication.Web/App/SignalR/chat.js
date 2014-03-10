(function () {
    'use strict';

    angular.module('SampleApplication.SignalR.Chat', ['ngResource', 'ngRoute'])
        .service('signalRSvc', ['$rootScope', function ($rootScope) {

            var connection = jQuery.hubConnection(),
                contosoChatHubProxy = connection.createHubProxy('messagesHub'),
                sendMessage = function (message) {
                    contosoChatHubProxy.invoke('send', 'test', message);
                };

            contosoChatHubProxy.on('addNewMessageToPage', function (name, message) {
                $rootScope.$emit("addNewMessageToPage", { name: name, message: message });
            });

            connection.start();

            return {
                sendMessage: sendMessage
            };
        }])
        .controller('ChatController', ['$scope', '$rootScope', 'signalRSvc', function ($scope, $rootScope, signalRSvc) {

            $scope.messages = [];

            $scope.send = function (message) {
                signalRSvc.sendMessage(message);
            };

            $rootScope.$on("addNewMessageToPage", function (e, msg) {
                $scope.$apply(function () {
                    $scope.messages.push(msg);
                });
            });
        }]);
}());
