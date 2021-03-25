import React from 'react';
import {getStoreForAnonymousUser} from "../../../__testshared/shared/store/mock-store-service";
import Login from "../../auth/Login";
import {initMockAxios, resetMockAxios} from "../../../__testshared/shared/frameworks/mock-http";
import {setupMocksForInValidUser, setupMocksForValidUserLogin} from "../../../__testshared/shared/api/mock-auth";
import {mountComponentWithStoreAndHistory} from "../../../__testshared/shared/component-helper";

import {appNotification} from "../../shared/notification/app-notification";
import {LOGIN} from "../../auth/authStore";


describe('Login shallow tests', () => {
    beforeEach(() => {
        initMockAxios();

    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks();
    });

    it('Clicking login with valid credentials should go to profile', async () => {

        const mountedComponent = mountComponentWithStoreAndHistory(<Login/>, getStoreForAnonymousUser())

        setupMocksForValidUserLogin();

        mountedComponent.setInputValue('input#userName', 'someuser')
        mountedComponent.setInputValue('input[type="password"]', 'somePassword');

        await mountedComponent.submitForm("form")

        await mountedComponent.reload();
        mountedComponent.expectLocationToBe("/profile")


        const store = mountedComponent.getStore();
        const actions = store.getActions()

       console.log("actions",actions)
        expect(actions.length).toBe(1);
        const action =actions[0]
        expect(action.type).toBe( LOGIN)
        expect(action.payload.token).not.toBeNull();

    });

    it('Clicking login with Invalid credentials should throw error', async () => {

        const showErrorSpy=  jest.spyOn(appNotification, 'showError')

        const mountedComponent = mountComponentWithStoreAndHistory(<Login/>, getStoreForAnonymousUser())

        setupMocksForInValidUser();

        mountedComponent.setInputValue('input#userName', 'invalidUser')
        mountedComponent.setInputValue('input[type="password"]', 'InValidPassword');

        await mountedComponent.submitForm("form")

        await mountedComponent.reload();


        mountedComponent.verifyOnComplete(()=>{
            expect(showErrorSpy).toHaveBeenCalled();

        })

    });
});
