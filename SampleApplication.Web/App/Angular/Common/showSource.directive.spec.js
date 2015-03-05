(function () {
    'use strict';

    describe('In module SampleApplication.Common', function () {

        beforeEach(module('SampleApplication.Common'));

        describe('show-source', function () {

            var scope, element,
                $httpBackend;

            beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$compile_) {
                // simulate a server for serving the directive template
                $httpBackend = _$httpBackend_;

                $httpBackend.expectGET('/api/source?path=test-url').respond({ Content: 'Hello world' });

                // the scope that will be linked to the directive DOM
                scope = _$rootScope_.$new();
            }));

            describe('using a constant url', function () {
                beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$compile_) {
                    // create the DOM
                    var dom = jQuery('<div show-source url="test-url"></div>');

                    // compile it and associate a scope
                    _$compile_(dom)(scope);

                    // get the root element
                    element = dom[0];

                    scope.$digest();
                    $httpBackend.flush();
                }));

                it('must display content from url', function () {
                    expect(element.innerText).toContain("Hello world");
                });
            });

            describe('using a bound url', function () {
                beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$compile_) {
                    // create the DOM
                    var dom = jQuery('<div show-source url="{{ url }}"></div>');

                    // compile it and associate a scope
                    _$compile_(dom)(scope);

                    // get the root element
                    element = dom[0];

                    scope.$digest();
                }));

                it('must display content from url', function () {
                    scope.url = 'test-url';

                    scope.$digest();
                    $httpBackend.flush();
                    expect(element.innerText).toContain("Hello world");
                });
            });

            afterEach(function () {
                // all expectations must have been satisfied
                $httpBackend.verifyNoOutstandingExpectation();

                // all requests have been flushed
                $httpBackend.verifyNoOutstandingRequest();

                scope.$destroy();
            });
        });
    });
}());