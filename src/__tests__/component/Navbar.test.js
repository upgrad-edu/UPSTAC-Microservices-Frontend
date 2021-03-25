import {initMockAxios, resetMockAxios} from "../../../__testshared/shared/frameworks/mock-http";
import {
    setupErrorMocksForPendingApprovals,
    setupMocksForPendingApprovals
} from "../../../__testshared/shared/api/mock-authority";
import {mountComponentWithStoreAndHistory} from "../../../__testshared/shared/component-helper";
import PendingApprovals from "../../authority/PendingApprovals";
import {
    getStoreForGovernmentAuthority,
    getStoreForGovernmentAuthorityWithPendingUsersAndThresholds
} from "../../../__testshared/shared/store/mock-store-service";
import MUIDataTable from "mui-datatables";
import {UPDATE_PENDING_USERDATA} from "../../authority/store/authorityStore";
import {appNotification} from "../../shared/notification/app-notification";
import React from "react";
import Navbar from "../../component/Navbar";
import IconButton from "@material-ui/core/IconButton";
import {Toolbar} from "../../component";
import {LOGOUT} from "../../auth/authStore";


describe('NavBar  tests', () => {

    beforeEach(() => {
        initMockAxios();


    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });

    it('should call logout ,if logout is been clicked', async () => {

        setupMocksForPendingApprovals();


        const mountedComponent = mountComponentWithStoreAndHistory(<Navbar/>,
            getStoreForGovernmentAuthority())


        await mountedComponent.waitForDomLoad();


        const container = mountedComponent.getContainer()
        container.find('#btnlogout').at(0).simulate('click');



        const store = mountedComponent.getStore();
        mountedComponent.verifyOnComplete(()=>{


            expect(store.getActions()).not.toBeNull()
            const allStoreActionTypes = store.getActions().map(action=> action["type"])
            expect(allStoreActionTypes).toContain(LOGOUT)




        })






    });



});

