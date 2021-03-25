import {initMockAxios, resetMockAxios} from "../../../__testshared/shared/frameworks/mock-http";
import {mockNotificationAndConfirmationModules} from "../../../__testshared/shared/frameworks/mock-notification";
import {setupMocksForDoAssignConsultation} from "../../../__testshared/shared/api/mock-consultation";
import {mountComponentWithStoreAndHistory} from "../../../__testshared/shared/component-helper";
import {getStoreForLoggedInTester} from "../../../__testshared/shared/store/mock-store-service";
import MUIDataTable from "mui-datatables";
import React from "react";
import {
    setupMocksForDoAssignLabResult,
    setupMocksForDoGetPendingTestRequests
} from "../../../__testshared/lab/mock-lab";
import {doGetPendingTestResponse} from "../../../__testshared/lab/lab-responses";
import PendingLabTests from "../../lab/PendingLabTests";

describe('Pending Lab  tests', () => {

    beforeEach(() => {
        initMockAxios();
        mockNotificationAndConfirmationModules()
    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });

    it('Pending Lab  should load all data', async () => {

        setupMocksForDoGetPendingTestRequests();


        const mountedComponent = mountComponentWithStoreAndHistory(<PendingLabTests/>,
            getStoreForLoggedInTester())


        await mountedComponent.waitForDomLoad();



        const container= mountedComponent.getContainer()


        mountedComponent.verifyOnComplete(()=>{

            const record =container.find(MUIDataTable).props("data")
            expect(record).not.toBeNull()
            expect(record.data).not.toBeNull()
            expect(record.data.length).toBeGreaterThan(1)

        })



    });



    it('Pending Tests  ,clicking assign should assign to me', async () => {

        setupMocksForDoGetPendingTestRequests();


        const mountedComponent = mountComponentWithStoreAndHistory(<PendingLabTests/>,
            getStoreForLoggedInTester())

        await mountedComponent.waitForDomLoad();



        const container= mountedComponent.getContainer()


        const buttons =container.find("button").filterWhere((node) => {
            return node.html().indexOf("Assign to Me") >=0;

        });



        expect(buttons).not.toBeNull()
        expect(buttons.length).toBeGreaterThan(0)

        const pendingRequest = doGetPendingTestResponse[0]
        setupMocksForDoAssignLabResult(pendingRequest.requestId)
        buttons.at(0).simulate('click');


        await mountedComponent.reload();

        mountedComponent.expectLocationContains("update-lab-report")





    });




});
