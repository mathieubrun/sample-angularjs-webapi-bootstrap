(function () {
    'use strict';

    angular
        .module('SampleApplication.Angular.Caching')
        .factory('smartCacheInterceptor', factory);

    factory.$inject = ['$q', 'SampleApplicationVersion'];

    function factory($q, SampleApplicationVersion) {
        return {
            request: function (config) {
                if (config.url.indexOf(".htm") > -1) {
                    var separator = config.url.indexOf("?") === -1 ? "?" : "&";
                    config.url = config.url + separator + "v=" + SampleApplicationVersion;
                }
                return config || $q.when(config);
            }
        };
    }
}());