import {initMockAxios, resetMockAxios} from "../../../__testshared/shared/frameworks/mock-http";
import {mockNotificationAndConfirmationModules} from "../../../__testshared/shared/frameworks/mock-notification";
import {setupMocksForDoGetTestRequestByID} from "../../../__testshared/shared/api/mock-testrequests";
import {setupMocksForDoCompleteConsultation} from "../../../__testshared/shared/api/mock-consultation";
import {
    getStoreForLoggedInDoctor,
    getStoreForLoggedInTester
} from "../../../__testshared/shared/store/mock-store-service";
import {mountComponentWithStoreAndHistoryAndUrl} from "../../../__testshared/shared/component-helper";
import UpdateConsultation from "../../consultation/UpdateConsultation";
import React from "react";
import {setupMocksForDoUpdateLabResult} from "../../../__testshared/lab/mock-lab";
import UpdateLabResult from "../../lab/UpdateLabResult";

describe('Update Lab  tests', () => {

    beforeEach(() => {

        initMockAxios();

        mockNotificationAndConfirmationModules();

    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });

    it('Update Lab Result should load based on id', async () => {

        const id=21
        setupMocksForDoGetTestRequestByID(id)
        setupMocksForDoUpdateLabResult(id);

        const defaultUrl='/update-lab-report/'+id;
        const routePath='/update-lab-report/:id'

        const store= getStoreForLoggedInTester()


        const mountedComponent= mountComponentWithStoreAndHistoryAndUrl( <UpdateLabResult/>,{ store,defaultUrl,routePath})




        await mountedComponent.waitForDomLoad();



        const container= mountedComponent.getContainer()


        mountedComponent.setInputValue('#bloodPressure', '95')
        mountedComponent.setInputValue('#heartBeat', '99')
        mountedComponent.setInputValue('#oxygenLevel', 'Normal')
        mountedComponent.setInputValue('#temperature', '99')
        mountedComponent.setInputValue('#comments', '99')


        mountedComponent.setValue('[id="selectLabResult"]', "POSITIVE")
        await mountedComponent.waitForDomLoad();
        mountedComponent.setValue('[id="selectLabResult"]', "NEGATIVE")


        await mountedComponent.submitForm("form")

        await mountedComponent.reload();
        mountedComponent.expectLocationToBe("/lab-history")







    });



});
