(function () {
    'use strict';

    describe('In module SampleApplication.Angular.Services', function () {

        beforeEach(module('SampleApplication.Angular.Services'));

        describe('SecondController', function () {

            var scope, $httpBackend, createController, messages;

            beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_, _messages_) {
                $httpBackend = _$httpBackend_;
                scope = _$rootScope_.$new();
                messages = _messages_;

                createController = function () {
                    return _$controller_('SecondController', { '$scope': scope });
                };

                createController();
            }));

            it('must call readMessages when read function is called', function () {
                // arrange
                var readMessagesSpy = spyOn(messages, 'readMessages').and.callThrough();

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