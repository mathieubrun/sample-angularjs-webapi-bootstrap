(function () {
    'use strict';

    describe('In module SampleApplication.Angular.Loader', function () {

        beforeEach(module('SampleApplication.Angular.Loader'));

        // this will test the loader directive
        describe('loader', function () {

            var scope, directiveScope, element,
                $httpBackend,
                expectedContent = "expected";

            beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$compile_) {
                // simulate a server for serving the directive template
                $httpBackend = _$httpBackend_;
                $httpBackend.when('GET', 'app/angular/loader/loader.html').respond('<div><div ng-if="status!=200" ng-switch="status"><div ng-switch-when="0"><span><i class="fa fa-2x fa-spin fa-spinner"></i>Loading</span></div><div ng-switch-default><span>Error from server : {{status}}</span></div></div><div ng-if="status==200" ng-transclude></div></div>');

                // the scope that will be linked to the directive DOM
                scope = _$rootScope_.$new();

                // create the DOM
                var dom = jQuery('<div loader="data">' + expectedContent + '</div>');

                // compile it and associate a scope
                _$compile_(dom)(scope);

                // simulate the server returning template
                $httpBackend.flush();

                // get the root element
                element = dom[0];

                // and the isolated scope
                directiveScope = jQuery(element).isolateScope();
            }));

            describe('when data is not a promise', function () {
                beforeEach(inject(function () {
                    scope.data = {};

                    // this will fire the $watch callback
                    scope.$apply();
                }));

                it('must display content immediately', function () {
                    // assert
                    expect(element.innerText).toBe(expectedContent);
                });

                it('scope.status must be 200', function () {
                    // assert
                    expect(directiveScope.status).toBe(200);
                });
            });

            describe('when data is a promise', function () {
                var p;

                beforeEach(inject(function (_$q_) {
                    // create a promise
                    p = _$q_.defer();

                    // simulate the promise returned by $resource
                    scope.data = {};
                    scope.data.$promise = p.promise;

                    // this will fire the $watch callback
                    scope.$apply();
                }));

                it('must display loading message', function () {
                    // assert
                    expect(element.innerText).toBe("Loading");
                });

                it('scope.status must be 0', function () {
                    // assert
                    expect(directiveScope.status).toBe(0);
                });

                describe('when promise is resolved', function () {

                    beforeEach(function () {
                        // act
                        p.resolve();

                        // this will fire the $watch callback
                        scope.$apply();
                    });

                    it('must display content ', function () {
                        // assert
                        expect(element.innerText).toBe(expectedContent);
                    });

                    it('scope.status must be 200', function () {
                        // assert
                        expect(directiveScope.status).toBe(200);
                    });
                });

                describe('when promise fails', function () {

                    var errorCode = 501;

                    beforeEach(function () {
                        // act, simulate $resource error
                        p.reject({ status: errorCode });

                        // this will fire the $watch callback
                        scope.$apply();
                    });

                    it('must display content ', function () {
                        // assert
                        expect(element.innerText).toBe("Error from server : " + errorCode);
                    });

                    it('scope.status must be errorCode', function () {
                        // assert
                        expect(directiveScope.status).toBe(errorCode);
                    });
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