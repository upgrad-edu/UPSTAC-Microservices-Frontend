import {initMockAxios, resetMockAxios} from "../../../__testshared/shared/frameworks/mock-http";
import {mountComponentWithStoreAndHistoryAndUrl} from "../../../__testshared/shared/component-helper";
import {getStoreForAnonymousUser} from "../../../__testshared/shared/store/mock-store-service";
import {setupMockErrorForUploadDocument, setupMocksForUploadDocument} from "../../../__testshared/shared/api/mock-auth";
import * as appNotificationModule from "../../shared/notification/app-notification";
import React from "react";
import {mockNotificationAndConfirmationModules} from "../../../__testshared/shared/frameworks/mock-notification";
import {UploadDocument} from "../../documents/UploadDocument";


describe('Upload Document tests', () => {

    beforeEach(() => {
        initMockAxios();
        mockNotificationAndConfirmationModules();
    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });

    it('Uploading document for tester should display tester', async () => {



        const id =21;
        setupMocksForUploadDocument(id)
        const defaultUrl='/upload-document/TESTER/21';
        const routePath='/upload-document/:role/:id'

        const store= getStoreForAnonymousUser()


        const mountedComponent= mountComponentWithStoreAndHistoryAndUrl( <UploadDocument/>,{ store,defaultUrl,routePath})



        await mountedComponent.waitForDomLoad();



        const container= mountedComponent.getContainer()

        expect(container.html()).toContain("Please upload the Lab Tester ID card for account verification")

        mountedComponent.setFileValue('[id="fileUpdate"]', 'USER')

        mountedComponent.setFormControlChecked('[id="documentAgreeCondition"]')

        await mountedComponent.submitForm("form")

        await mountedComponent.reload();
        mountedComponent.expectLocationToBe("/")

    });
    it('Uploading document without not agreeing conditions should throw error', async () => {



        const id =21;
        const defaultUrl='/upload-document/DOCTOR/21';
        const routePath='/upload-document/:role/:id'

        const store= getStoreForAnonymousUser()


        const mountedComponent= mountComponentWithStoreAndHistoryAndUrl( <UploadDocument/>,{ store,defaultUrl,routePath})



        await mountedComponent.waitForDomLoad();



        const container= mountedComponent.getContainer()

        expect(container.html()).toContain("Please upload the Doctor ID card for account verification")

        mountedComponent.setFileValue('[id="fileUpdate"]', 'DOCTOR UPLOAD')


        await mountedComponent.submitForm("form")

        mountedComponent.verifyOnComplete(()=>{

            expect(appNotificationModule.appNotification.showError).toBeCalled()

        })

    });
    it('Uploading document without selecting files should throw error', async () => {



        const id =21;
        const defaultUrl='/upload-document/DOCTOR/21';
        const routePath='/upload-document/:role/:id'

        const store= getStoreForAnonymousUser()


        const mountedComponent= mountComponentWithStoreAndHistoryAndUrl( <UploadDocument/>,{ store,defaultUrl,routePath})



        await mountedComponent.waitForDomLoad();



        const container= mountedComponent.getContainer()


        mountedComponent.setFormControlChecked('[id="documentAgreeCondition"]')

        await mountedComponent.submitForm("form")

        mountedComponent.verifyOnComplete(()=>{


            expect(appNotificationModule.appNotification.showError).toBeCalled()
            const args = appNotificationModule.appNotification.showError.mock.calls[0][0]
            expect(args).toContain("Please Select a Document to upload")

        })

    });

    it('Uploading document when server down should throw error', async () => {



        const id =21;
        setupMockErrorForUploadDocument(id)
        const defaultUrl='/upload-document/DOCTOR/21';
        const routePath='/upload-document/:role/:id'

        const store= getStoreForAnonymousUser()


        const mountedComponent= mountComponentWithStoreAndHistoryAndUrl( <UploadDocument/>,{ store,defaultUrl,routePath})



        await mountedComponent.waitForDomLoad();



        const container= mountedComponent.getContainer()

        mountedComponent.setFileValue('[id="fileUpdate"]', 'DOCTOR UPLOAD')

        mountedComponent.setFormControlChecked('[id="documentAgreeCondition"]')


        await mountedComponent.submitForm("form")



        await mountedComponent.waitForDomLoad();

        mountedComponent.verifyOnComplete(()=>{

            expect(appNotificationModule.appNotification.showError).toBeCalled()

        })

    });

});

