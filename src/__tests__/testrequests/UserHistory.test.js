import {initMockAxios, resetMockAxios} from "../../../__testshared/shared/frameworks/mock-http";
import {setupMocksForGetMyLabHistory} from "../../../__testshared/lab/mock-lab";
import {mountComponentWithStoreAndHistory} from "../../../__testshared/shared/component-helper";
import LabHistory from "../../lab/LabHistory";
import {
    getStoreForLoggedInTester,
    getStoreForLoggedInUser
} from "../../../__testshared/shared/store/mock-store-service";
import React from "react";
import {setupMocksForDoGetMyTestRequests} from "../../../__testshared/shared/api/mock-testrequests";
import UserHistory from "../../testrequests/UserHistory";
import http from "../../shared/services/http-service";

describe('User History tests', () => {

    beforeEach(() => {
        initMockAxios();

    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });

    it('User History should load all data', async () => {

        setupMocksForDoGetMyTestRequests();

        const httpSpy=  jest.spyOn(http, 'get')


        const mountedComponent = mountComponentWithStoreAndHistory(<UserHistory/>,
            getStoreForLoggedInUser())


        await mountedComponent.waitForDomLoad();



        const container= mountedComponent.getContainer()


        mountedComponent.verifyOnComplete(()=>{
            expect(httpSpy).toBeCalled()

        })




    });




});

