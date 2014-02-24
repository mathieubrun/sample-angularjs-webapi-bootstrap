(function () {
    'use strict';

    describe('SampleApplication.Angular.Loader', function () {

        beforeEach(module('SampleApplication.Angular.Loader'));

        describe('loader', function () {

            var scope, element,
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

                it('must display content when promise is resolved', function () {
                    // act
                    p.resolve();
                    scope.$apply();

                    // assert
                    expect(element.innerText).toBe(expectedContent);
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