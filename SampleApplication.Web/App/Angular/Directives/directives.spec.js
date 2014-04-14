(function () {
    'use strict';

    describe('In module SampleApplication.Angular.Directives module', function () {

        // this module need to be loaded
        // it is important to load just this module, so if it is missing dependencies, they will be caught in the following tests
        beforeEach(module('SampleApplication.Angular.Directives'));

        describe('numbersSimple', function () {

            var scope, directiveScope, element,
                $httpBackend,
                expectedContent = "expected";

            beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$compile_) {
                
                // the scope that will be linked to the directive DOM
                scope = _$rootScope_.$new();

                // create the DOM
                var dom = jQuery('<div numbers-simple start="begin" count="5"></div>');

                // compile it and associate a scope
                _$compile_(dom)(scope);

                // get the root element
                element = dom[0];

                // and the isolated scope
                directiveScope = jQuery(element).isolateScope();
            }));

            describe('content', function () {
                beforeEach(inject(function () {
                    scope.begin = 10;
                    scope.cnt = 5;

                    // this will fire the $watch callback
                    scope.$apply();
                }));

                it('must match start and count values', function () {
                    // assert
                    expect(element.innerText).toBe("10-11-12-13-14");
                });

                it('must react to changes on scope.begin', function () {
                    // act
                    scope.begin = 5;
                    scope.$apply();

                    // assert
                    expect(element.innerText).toBe("5-6-7-8-9");
                });

                it('must display empty content if scope.begin is < 0', function () {
                    // act
                    scope.begin = -5;
                    scope.$apply();

                    // assert
                    expect(element.innerText).toBe("");
                });

                it('must display empty content if scope.begin is undefined', function () {
                    // act
                    scope.begin = undefined;
                    scope.$apply();

                    // assert
                    expect(element.innerText).toBe("");
                });
            });
        });
    });
}());