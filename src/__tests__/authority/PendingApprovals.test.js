import React from 'react';
import {initMockAxios, resetMockAxios} from "../../../__testshared/shared/frameworks/mock-http";
import {
    setupErrorMocksForPendingApprovals,
    setupMocksForAllRequests,
    setupMocksForAllThreshold,
    setupMocksForAllThresholdError, setupMocksForPendingApprovals
} from "../../../__testshared/shared/api/mock-authority";
import AuthorityDashboard from "../../authority/AuthorityDashboard";
import {Bar, Doughnut} from "react-chartjs-2";
import {mountComponentWithStoreAndHistory} from "../../../__testshared/shared/component-helper";
import {
    getStoreForGovernmentAuthority,
    getStoreForGovernmentAuthorityWithPendingUsersAndThresholds
} from "../../../__testshared/shared/store/mock-store-service";
import PendingApprovals from "../../authority/PendingApprovals";

import MUIDataTable from "mui-datatables";
import {UPDATE_PENDING_USERDATA} from "../../authority/store/authorityStore";
import {appNotification} from "../../shared/notification/app-notification";
describe('Pending Approval  tests', () => {

    beforeEach(() => {
        initMockAxios();


    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });

    it('should call UPDATE_PENDING_USERDATA to update data in store if there is no data and api returns value', async () => {

        setupMocksForPendingApprovals();


        const mountedComponent = mountComponentWithStoreAndHistory(<PendingApprovals/>,
            getStoreForGovernmentAuthority())


        await mountedComponent.waitForDomLoad();


        const container= mountedComponent.getContainer()
        const store = mountedComponent.getStore();
        mountedComponent.verifyOnComplete(()=>{

            expect(container.find(MUIDataTable)).not.toBeNull()
            expect(store.getActions()).not.toBeNull()
            const allStoreActionTypes = store.getActions().map(action=> action["type"])
            expect(allStoreActionTypes).toContain(UPDATE_PENDING_USERDATA)




        })






    });

    it('should show data if there is pendingUsers data ', async () => {



        const mountedComponent = mountComponentWithStoreAndHistory(<PendingApprovals/>,
            getStoreForGovernmentAuthorityWithPendingUsersAndThresholds())


        await mountedComponent.waitForDomLoad();


        const container= mountedComponent.getContainer()

        mountedComponent.verifyOnComplete(()=>{

            const node = container.find(MUIDataTable);
            const records =node.prop("data")
            expect(records.length).toBeGreaterThan(1)


        })






    });

    it('should show error message if there is no data and api throws error', async () => {

        const showErrorSpy=  jest.spyOn(appNotification, 'showError')

        setupErrorMocksForPendingApprovals();
        const mountedComponent = mountComponentWithStoreAndHistory(<PendingApprovals/>,
            getStoreForGovernmentAuthority())


        await mountedComponent.waitForDomLoad();


        mountedComponent.verifyOnComplete(()=>{
            expect(showErrorSpy).toHaveBeenCalled();
        })




    });


});

