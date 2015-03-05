(function () {
    'use strict';

    angular
        .module('SampleApplication', [
            'ngResource',
            'ngRoute',

            'ui.date',
            'ui.bootstrap.tabs',
            'ui.bootstrap.dropdownToggle',

            'SampleApplication.Common',
            'SampleApplication.Config',
            'SampleApplication.Angular.Caching',
            'SampleApplication.Angular.Data',
            'SampleApplication.Angular.Directives',
            'SampleApplication.Angular.Services',
            'SampleApplication.Angular.Loader'
        ]);
}());