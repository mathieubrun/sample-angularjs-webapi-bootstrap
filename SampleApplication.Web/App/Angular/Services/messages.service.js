(function () {
    'use strict';

    angular
        .module('SampleApplication.Angular.Services')
        .service('messages', service);

    service.$inject = [];

    function service() {
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
    }
}());