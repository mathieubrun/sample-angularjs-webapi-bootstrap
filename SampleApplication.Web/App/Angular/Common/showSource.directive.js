(function () {
    'use strict';

    angular
        .module('SampleApplication.Common')
        .directive('showSource', directive);

    directive.$inject = ['$resource'];

    function directive($resource) {
        return {
            template: '<pre>{{file.Content}}</pre>',
            restrict: 'EA',
            replace: true,
            link: function (scope, elem, attrs) {
                var res = $resource('/api/source');

                attrs.$observe('url', function (value) {
                    if (value) {
                        scope.file = res.get({ path: value });
                    }
                });
            }
        };
    }
}());