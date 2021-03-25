import {initMockAxios, resetMockAxios} from "../../../../__testshared/shared/frameworks/mock-http";
import {mockNotificationAndConfirmationModules} from "../../../../__testshared/shared/frameworks/mock-notification";
import {
    setupMockErrorForUploadDocument,
    setupMocksForUploadDocument
} from "../../../../__testshared/shared/api/mock-auth";
import {getStoreForAnonymousUser} from "../../../../__testshared/shared/store/mock-store-service";
import {mountComponentWithStoreAndHistoryAndUrl} from "../../../../__testshared/shared/component-helper";
import {UploadDocument} from "../../../documents/UploadDocument";
import * as appNotificationModule from "../../../shared/notification/app-notification";
import React from "react";
import ConfirmMessageComponent from "../../../shared/confirm/confirm-message-component";
import {confirmMessageService} from "../../../shared/confirm/confirm-message-service";
import IconButton from "@material-ui/core/IconButton";

describe('ConfirmMessageComponent tests', () => {

    beforeEach(() => {
        initMockAxios();

    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });

    it('ConfirmMessageComponent should render confirm box', async (done) => {

        const store= getStoreForAnonymousUser()
        const mountedComponent= mountComponentWithStoreAndHistoryAndUrl( <ConfirmMessageComponent/>,{ store})
        await mountedComponent.waitForDomLoad();

           confirmMessageService.show("halo").then(res=>{
                done();
           })
        await mountedComponent.waitForDomLoad();
        const container= mountedComponent.getContainer()
        container.find('#btnConfirm').at(0).simulate('click');
    });

});

