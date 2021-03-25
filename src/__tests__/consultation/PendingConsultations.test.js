import {initMockAxios, resetMockAxios} from "../../../__testshared/shared/frameworks/mock-http";
import {
    setupMocksForDoAssignConsultation,
    setupMocksForDoGetPendingConsultations
} from "../../../__testshared/shared/api/mock-consultation";
import {mountComponentWithStoreAndHistory} from "../../../__testshared/shared/component-helper";
import {getStoreForLoggedInDoctor} from "../../../__testshared/shared/store/mock-store-service";
import React from "react";
import MUIDataTable from "mui-datatables";
import PendingConsultations from "../../consultation/PendingConsultations";
import {doGetPendingConsultationsResponse} from "../../../__testshared/shared/data/consulation-responses";
import {mockNotificationAndConfirmationModules} from "../../../__testshared/shared/frameworks/mock-notification";

describe('Pending Consultation  tests', () => {

    beforeEach(() => {
        initMockAxios();
    mockNotificationAndConfirmationModules()
    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });

    it('Pending Consultation  should load all data', async () => {

        setupMocksForDoGetPendingConsultations();


        const mountedComponent = mountComponentWithStoreAndHistory(<PendingConsultations/>,
            getStoreForLoggedInDoctor())


        await mountedComponent.waitForDomLoad();



        const container= mountedComponent.getContainer()


        mountedComponent.verifyOnComplete(()=>{

            const record =container.find(MUIDataTable).props("data")
            expect(record).not.toBeNull()
            expect(record.data).not.toBeNull()
            expect(record.data.length).toBeGreaterThan(1)

        })



    });



    it('Pending Consultation  ,clicking assign should assign to me', async () => {

        setupMocksForDoGetPendingConsultations();


        const mountedComponent = mountComponentWithStoreAndHistory(<PendingConsultations/>,
            getStoreForLoggedInDoctor())


        await mountedComponent.waitForDomLoad();



        const container= mountedComponent.getContainer()


        const buttons =container.find("button").filterWhere((node) => {
            return node.html().indexOf("Assign to Me") >=0;

        });



        expect(buttons).not.toBeNull()
        expect(buttons.length).toBeGreaterThan(0)

        const pendingRequest = doGetPendingConsultationsResponse[0]
        setupMocksForDoAssignConsultation(pendingRequest.requestId)
        buttons.at(0).simulate('click');


        await mountedComponent.reload();

        mountedComponent.expectLocationContains("update-consultation")



        mountedComponent.verifyOnComplete(()=>{

            const record =container.find(MUIDataTable).props("data")
            expect(record).not.toBeNull()
            expect(record.data).not.toBeNull()
            expect(record.data.length).toBeGreaterThan(1)

        })



    });




});
