(function () {
    'use strict';

    angular.module('SampleApplication.SignalR.Chat', ['ngResource', 'ngRoute'])
        .config(['$provide', function ($provide) {
            $provide.decorator('$rootScope', ['$delegate', function ($delegate) {

                $delegate.constructor.prototype.$onRootScope = function (name, listener) {
                    var unsubscribe = $delegate.$on(name, listener);
                    this.$on('$destroy', unsubscribe);
                };

                return $delegate;
            }]);
        }])
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
        .controller('ChatController', ['$scope', 'signalRSvc', function ($scope, signalRSvc) {

            $scope.messages = [];

            $scope.send = function (message) {
                signalRSvc.sendMessage('test', message);
            };

            $scope.$onRootScope("addNewMessageToPage", function (e, msg) {
                $scope.$apply(function () {
                    $scope.messages.push(msg);
                });
            });
        }]);
}());
