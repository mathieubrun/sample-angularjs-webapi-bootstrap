(function () {
    'use strict';

    describe('In module SampleApplication.Angular.Services', function () {

        beforeEach(module('SampleApplication.Angular.Services'));

        describe('FirstController', function () {

            var scope, $httpBackend, createController, MessageService;

            beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_, _MessageService_) {
                $httpBackend = _$httpBackend_;
                scope = _$rootScope_.$new();
                MessageService = _MessageService_;

                createController = function () {
                    return _$controller_('FirstController', { '$scope': scope });
                };

                createController();
            }));

            it('must call recordMessage when write function is called', function () {
                // arrange
                var expectedMessage = "hello";

                // this will show in MessageService coverage as "not covered" !
                var recordMessageSpy = spyOn(MessageService, 'recordMessage').and.callFake(function (message) { });

                // act
                scope.write(expectedMessage);

                // assert
                expect(recordMessageSpy).toHaveBeenCalledWith(expectedMessage);
            });

            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
        });

        describe('SecondController', function () {

            var scope, $httpBackend, createController, MessageService;

            beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_, _MessageService_) {
                $httpBackend = _$httpBackend_;
                scope = _$rootScope_.$new();
                MessageService = _MessageService_;

                createController = function () {
                    return _$controller_('SecondController', { '$scope': scope });
                };

                createController();
            }));

            it('must call readMessages when read function is called', function () {
                // arrange
                var readMessagesSpy = spyOn(MessageService, 'readMessages').and.callThrough();

                // act
                scope.read();

                // assert
                expect(readMessagesSpy).toHaveBeenCalled();
            });

            afterEach(function () {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
        });
    });
}());