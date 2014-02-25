(function () {
    'use strict';

    describe('SampleApplication.Angular.Loader', function () {

        beforeEach(module('SampleApplication.Angular.Loader'));

        describe('loader', function () {

            var scope, directiveScope, element,
                $compile, $httpBackend,
                expectedContent = "expected";

            function compile(html) {
                var dom = jQuery(html);
                $compile(dom)(scope);
                scope.$apply();

                element = dom[0];
            }

            beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$compile_) {
                $httpBackend = _$httpBackend_;
                $compile = _$compile_;
                scope = _$rootScope_.$new();


                $httpBackend.when('GET', 'app/angular/loader/loader.html').respond('<div><div ng-if="status!=200" ng-switch="status"><div ng-switch-when="0"><span><i class="fa fa-2x fa-spin fa-spinner"></i>Loading</span></div><div ng-switch-default><span>Error from server : {{status}}</span></div></div><div ng-if="status==200" ng-transclude></div></div>');

                compile('<div loader="data">' + expectedContent + '</div>');
                $httpBackend.flush();

                directiveScope = jQuery(element).isolateScope();
            }));

            describe('when data is not a promise', function () {
                beforeEach(inject(function () {
                    scope.data = {};
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
                    p = _$q_.defer();
                    scope.data = {};
                    scope.data.$promise = p.promise;
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
                        // act
                        p.reject({ status: errorCode });
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
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
                scope.$destroy();
            });
        });
    });
}());