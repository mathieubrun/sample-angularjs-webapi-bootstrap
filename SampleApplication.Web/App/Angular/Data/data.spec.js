(function () {
    'use strict';

    describe('Those tests will be related to JS files located in SampleApplication.Angular.Data module', function () {

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

        describe('DataController', function () {

            // the easy way to get some json data is to capture and copy paste it using chrome network tab
            var scope, $httpBackend, createController,
                client = { "Id": "155f9a89-54b2-4a9c-86c3-f4b1eec60332", "RegistrationDate": "2014-02-24T22:27:24.5125825+01:00", "Company": "123 Warehousing", "FirstName": "Adrien", "LastName": "Adam", "Recommandations": [{ "Id": "107e2d03-ebea-45ea-8301-b0a9b7f42a07", "Title": "Cars" }, { "Id": "e6c0c846-c336-4a61-b080-fde0cb347f71", "Title": "Bikes" }] },
                recommandations = [{ "Id": "107e2d03-ebea-45ea-8301-b0a9b7f42a07", "Title": "Cars" }, { "Id": "e6c0c846-c336-4a61-b080-fde0cb347f71", "Title": "Bikes" }, { "Id": "6dea8ccc-82c7-4890-81c7-518069079351", "Title": "Boats" }];

            // this will get executed before each "it"
            beforeEach(inject(function (_$rootScope_, _$httpBackend_, _$controller_) {
                $httpBackend = _$httpBackend_;

                // the when methods will just make sure that the mocked backend returns some fake data, without expectations that will be tested later
                $httpBackend.when('GET', 'api/recommandations').respond(recommandations);
                $httpBackend.when('GET', 'api/clients/123').respond(client);

                // create a scope for the controller
                scope = _$rootScope_.$new();

                createController = function () {
                    var ctrl = _$controller_('DataController', { '$scope': scope, $routeParams: { id: 123 } });

                    // ensure that the resources calls made during constructions return some data
                    $httpBackend.flush();

                    return ctrl;
                };
            }));

            it('must call api/recommandations and api/clients/123 on creation', function () {
                // arrange
                // the expectGET methods set an expectation on request order as well
                $httpBackend.expectGET('api/recommandations').respond([]);
                $httpBackend.expectGET('api/clients/123').respond({});

                // act
                // assert
                createController();
            });

            describe('set the following methods on $scope', function () {

                // arrange
                // this will get executed before each "it", and after the nesting "beforeEach"
                beforeEach(function () {
                    createController();
                });

                describe('$scope.cancel', function () {
                    // this will get executed before each "it", and after the nesting "beforeEach"
                    // so this enables nice separation in test building
                    beforeEach(function () {
                        // act
                        scope.cancel();
                    });

                    it('must set model.IsEditing to false', function () {
                        // assert
                        expect(scope.model.IsEditing).toBe(false);
                    });
                });

                describe('$scope.edit', function () {
                    beforeEach(function () {
                        // act
                        scope.edit();
                    });


                    it('must set model.IsEditing to true', function () {
                        // assert
                        expect(scope.model.IsEditing).toBe(true);
                    });

                    it('must create a copy of scope.data object', function () {
                        // act
                        scope.newData.FirstName = "changed";

                        // assert
                        expect(scope.data.Id).toEqual(scope.newData.Id);
                        expect(scope.data.FirstName).not.toEqual(scope.newData.FirstName);
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