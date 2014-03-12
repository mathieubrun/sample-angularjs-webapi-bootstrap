(function () {
    'use strict';

    angular.module('SampleApplication.SignalR.Chat', ['ngResource', 'ngRoute'])
        .service('signalRSvc', ['$rootScope', function ($rootScope) {

            var connection = jQuery.hubConnection(),
                messagesHubProxy = connection.createHubProxy('messagesHub'),
                sendMessage = function (name, message) {
                    messagesHubProxy.invoke('send', name, message);
                };

            messagesHubProxy.on('addNewMessageToPage', function (userName, message) {
                $rootScope.$emit('addNewMessageToPage', { name: userName, message: message });
            });

            connection.start()
                .done(function () { console.log('Now connected, connection ID=' + connection.id); })
                .fail(function () { console.log('Could not connect'); });

            return {
                sendMessage: sendMessage
            };
        }])
        .controller('ChatController', ['$scope', '$rootScope', 'signalRSvc', function ($scope, $rootScope, signalRSvc) {

            $scope.messages = [];

            $scope.send = function (message) {
                signalRSvc.sendMessage('test', message);
            };

            $rootScope.$on("addNewMessageToPage", function (e, msg) {
                $scope.$apply(function () {
                    $scope.messages.push(msg);
                });
            });
        }]);
}());
