(function () {
    'use strict';

    describe('SampleApplication.Angular.Loader', function () {

        beforeEach(module('SampleApplication.Angular.Loader'));

        // Load the myApp module, which cont
        describe('LoaderController', function () {

            var scope, $httpBackend, createController;

            beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_) {
                $httpBackend = _$httpBackend_;
                scope = _$rootScope_.$new();

                createController = function () {
                    return _$controller_('LoaderController', { '$scope': scope });
                };
            }));

            it('must call api/clients/delay and api/clients/delay/error/:error on creation', function () {
                // arrange
                $httpBackend.expectGET('api/clients/delay').respond([]);
                $httpBackend.expectGET('api/clients/error/400').respond([]);
                $httpBackend.expectGET('api/clients/error/500').respond([]);

                // act
                createController();

                // assert
                $httpBackend.flush();
            });

            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
                scope.$destroy();
            });
        });
    });
}());