(function () {
    'use strict';

    describe('In module SampleApplication.Angular.Data module', function () {

        // this module need to be loaded
        // it is important to load just this module, so if it is missing dependencies, they will be caught in the following tests
        beforeEach(module('SampleApplication.Angular.Data'));

        describe('DatasController', function () {

            var scope, $httpBackend, createController;

            beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_) {
                $httpBackend = _$httpBackend_;
                scope = _$rootScope_.$new();

                createController = function () {
                    return _$controller_('DatasController', { '$scope': scope });
                };
            }));

            it('must call api/clients on creation', function () {
                // arrange
                // the expectGET method will ensure that the mocked backend receives the request 
                $httpBackend.expectGET('api/clients').respond([]);

                // act
                createController();

                // assert
                $httpBackend.flush();
            });

            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
        });
    });
}());