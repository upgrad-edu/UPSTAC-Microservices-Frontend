import {initMockAxios, resetMockAxios} from "../../../__testshared/shared/frameworks/mock-http";
import {mockNotificationAndConfirmationModules} from "../../../__testshared/shared/frameworks/mock-notification";
import {setupMocksForDoCompleteConsultation} from "../../../__testshared/shared/api/mock-consultation";
import {mountComponentWithStoreAndHistoryAndUrl} from "../../../__testshared/shared/component-helper";
import {getStoreForLoggedInDoctor} from "../../../__testshared/shared/store/mock-store-service";
import React from "react";
import UpdateConsultation from "../../consultation/UpdateConsultation";
import {setupMocksForDoGetTestRequestByID} from "../../../__testshared/shared/api/mock-testrequests";


describe('Update Consultation  tests', () => {

    beforeEach(() => {

        initMockAxios();

        mockNotificationAndConfirmationModules();

    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });

    it('Update Consultation  should load data by id', async () => {

        const id=21
        setupMocksForDoGetTestRequestByID(id)
        setupMocksForDoCompleteConsultation(id);

      const defaultUrl='/update-consultation/'+id;
      const routePath='/update-consultation/:id'

        const store= getStoreForLoggedInDoctor()


       const mountedComponent= mountComponentWithStoreAndHistoryAndUrl( <UpdateConsultation/>,{ store,defaultUrl,routePath})




        await mountedComponent.waitForDomLoad();



        const container= mountedComponent.getContainer()


        mountedComponent.setInputValue('#comments', 'nothing to worry')


        mountedComponent.setValue('[id="suggestionSelect"]', "HOME_QUARANTINE")


        await mountedComponent.submitForm("form")

        await mountedComponent.reload();
        mountedComponent.expectLocationToBe("/consultation-history")







    });



});
