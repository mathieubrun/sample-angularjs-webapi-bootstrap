(function () {
    'use strict';

    angular.module('SampleApplication.SignalR.Chat', ['ngResource', 'ngRoute'])
        .controller('ChatController', ['$scope', '$resource', function ($scope, $resource) {

            $scope.messages = [];

            $scope.send = function (message) {
                chat.server.send('test', message);
            };

            var chat = $.connection.messagesHub;
            // Create a function that the hub can call back to display messages.
            chat.client.addNewMessageToPage = function (name, message) {
                // Add the message to the page. 
                $scope.messages.push({ name: name, message: message });
            };

            // Start the connection.
            $.connection.hub.start().done(function () {
            });
        }])
}());