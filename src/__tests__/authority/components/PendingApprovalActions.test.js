import React from 'react';


import {PendingApprovalActions} from "../../../authority/components/PendingApprovalActions";
import IconButton from "@material-ui/core/IconButton";
import {initMockAxios, resetMockAxios} from "../../../../__testshared/shared/frameworks/mock-http";
import {mountComponentWithStoreAndHistory} from "../../../../__testshared/shared/component-helper";
import {getStoreForGovernmentAuthorityWithPendingUsersAndThresholds} from "../../../../__testshared/shared/store/mock-store-service";
import {
    setupErrorMocksForPendingApprovals, setupErrorMocksForUpdateApproval, setupMocksForRejectApproval,
    setupMocksForUpdateApproval
} from "../../../../__testshared/shared/api/mock-authority";
import {mockNotificationAndConfirmationModules} from "../../../../__testshared/shared/frameworks/mock-notification";
import * as appNotificationModule from "../../../shared/notification/app-notification";
import * as confirmMessageModule from "../../../shared/confirm/confirm-message-service";

function getSelectedUserOn(store, dataIndex) {
    return (store.getState().authority.pendingUsers)[dataIndex];
}

describe('Pending Approval  Actions tests', () => {

    beforeEach(() => {
        initMockAxios();
        mockNotificationAndConfirmationModules();

    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });


    it('should show success message , if the approval gets accepted', async () => {


        const dataIndex = 1;
        const mountedComponent = mountComponentWithStoreAndHistory(<PendingApprovalActions dataIndex={dataIndex}/>,
            getStoreForGovernmentAuthorityWithPendingUsersAndThresholds())


        await mountedComponent.waitForDomLoad();
        const selectedUser = getSelectedUserOn(mountedComponent.getStore(), dataIndex);
        setupMocksForUpdateApproval(selectedUser.userName, selectedUser.role)

        const container = mountedComponent.getContainer()
        container.find(IconButton).at(0).simulate('click');


        mountedComponent.verifyOnComplete(() => {

            expect(appNotificationModule.appNotification.showSuccess).toBeCalled()
            expect(confirmMessageModule.confirmMessageService.show).toBeCalled()

        })



    });

    it('should show error message , if the approval api returns error', async () => {


        const dataIndex = 1;
        const mountedComponent = mountComponentWithStoreAndHistory(<PendingApprovalActions dataIndex={dataIndex}/>,
            getStoreForGovernmentAuthorityWithPendingUsersAndThresholds())


        await mountedComponent.waitForDomLoad();

        setupErrorMocksForUpdateApproval()

        const container = mountedComponent.getContainer()
        container.find(IconButton).at(0).simulate('click');


        mountedComponent.verifyOnComplete(() => {

            expect(appNotificationModule.appNotification.showError).toBeCalled()


        })



    });

    it('should show success message , if the approval gets rejected', async () => {



        const dataIndex = 1;
        const mountedComponent = mountComponentWithStoreAndHistory(<PendingApprovalActions dataIndex={dataIndex}/>,
            getStoreForGovernmentAuthorityWithPendingUsersAndThresholds())


        await mountedComponent.waitForDomLoad();
        const selectedUser = getSelectedUserOn(mountedComponent.getStore(), dataIndex);
        setupMocksForRejectApproval(selectedUser.userName, selectedUser.role)

        const container = mountedComponent.getContainer()
        container.find(IconButton).at(1).simulate('click');


        mountedComponent.verifyOnComplete(() => {

            expect(appNotificationModule.appNotification.showSuccess).toBeCalled()
            expect(confirmMessageModule.confirmMessageService.show).toBeCalled()

        })



    });


});

