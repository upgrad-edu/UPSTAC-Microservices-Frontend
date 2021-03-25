import React from 'react';

import http from "../../shared/services/http-service";
import {setupMocksForAllThreshold, setupMocksForUpdateThreshold} from "../../../__testshared/shared/api/mock-authority";
import {getStoreForGovernmentAuthorityWithPendingUsersAndThresholds} from "../../../__testshared/shared/store/mock-store-service";
import {getASampleThreshold} from "../../../__testshared/shared/data/threshold-responses";
import {initMockAxios, resetMockAxios} from "../../../__testshared/shared/frameworks/mock-http";
import {flushPromises, mountComponentWithStoreAndHistory} from "../../../__testshared/shared/component-helper";
import UpdateThreshold from "../../authority/UpdateThreshold";
import {act} from "@testing-library/react";


describe('Update Threshold tests', () => {

    beforeEach(() => {
        initMockAxios();


    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });


    it('should display all thresholds and update threshold if clicked', async () => {

        const httpGetSpy=  jest.spyOn(http, 'get')
        const httpPostSpy=  jest.spyOn(http, 'post')

        setupMocksForAllThreshold()
        setupMocksForUpdateThreshold();


        const {thresholdType,maxLimit} = getASampleThreshold();

        const mountedComponent = mountComponentWithStoreAndHistory(<UpdateThreshold />,
            getStoreForGovernmentAuthorityWithPendingUsersAndThresholds())
        const container = mountedComponent.getContainer()





          await mountedComponent.waitForDomLoad();



        const selector=`[id="${thresholdType}"]`

        mountedComponent.setInputValue(selector, maxLimit+5)



        await mountedComponent.submitForm("form")



        process.nextTick(() =>{
            expect(httpGetSpy).toBeCalled()
            expect(httpPostSpy).toBeCalled()

        } );








    });



});

