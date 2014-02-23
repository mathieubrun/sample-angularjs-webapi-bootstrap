(function () {
    'use strict';

    angular.module('SampleApplication.Angular.Caching', ['SampleApplication.Config', 'SampleApplication.Common'])
        .factory('SmartCacheInterceptor', ['$q', 'SampleApplicationVersion', function ($q, SampleApplicationVersion) {
            return {
                request: function (config) {
                    if (config.url.indexOf(".htm") > -1) {
                        var separator = config.url.indexOf("?") === -1 ? "?" : "&";
                        config.url = config.url + separator + "v=" + SampleApplicationVersion;
                    }
                    return config || $q.when(config);
                }
            };
        }]);
}());