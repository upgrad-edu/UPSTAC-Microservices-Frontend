import {initMockAxios, resetMockAxios} from "../../../__testshared/shared/frameworks/mock-http";
import {mockNotificationAndConfirmationModules} from "../../../__testshared/shared/frameworks/mock-notification";
import {
    setupMocksForCreateTestRequest,
    setupMocksForDoGetTestRequestByID
} from "../../../__testshared/shared/api/mock-testrequests";
import {setupMocksForDoCompleteConsultation} from "../../../__testshared/shared/api/mock-consultation";
import {getStoreForLoggedInUser} from "../../../__testshared/shared/store/mock-store-service";
import {mountComponentWithStoreAndHistory} from "../../../__testshared/shared/component-helper";
import React from "react";
import RequestTest from "../../testrequests/RequestTest";
import http from "../../shared/services/http-service";

describe('Request Test  tests', () => {

    beforeEach(() => {

        initMockAxios();

        mockNotificationAndConfirmationModules();

    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });

    it('Selecting for myself should autofill data', async () => {

        setupMocksForCreateTestRequest("sample")
        const httpPostSpy=  jest.spyOn(http, 'post')


        const mountedComponent= mountComponentWithStoreAndHistory( <RequestTest/>, getStoreForLoggedInUser())




        await mountedComponent.waitForDomLoad();



        const container= mountedComponent.getContainer()



        mountedComponent.setValue('[id="select-test-for-me"]', "true")


        await mountedComponent.submitForm("form")

        await mountedComponent.reload();
        mountedComponent.expectLocationToBe("/user-history")

        mountedComponent.verifyOnComplete(() => {

        const args = httpPostSpy.mock.calls[0]
            console.log(args)
            expect(httpPostSpy).toBeCalled()




        })






    });


    it('Selecting for others should allow filling data', async () => {

        setupMocksForCreateTestRequest("sample")
        const httpPostSpy=  jest.spyOn(http, 'post')


        const mountedComponent= mountComponentWithStoreAndHistory( <RequestTest/>, getStoreForLoggedInUser())




        await mountedComponent.waitForDomLoad();



        const container= mountedComponent.getContainer()



        mountedComponent.setValue('[id="select-gender"]', "MALE")

        mountedComponent.setInputValue('[id="pinCode"]', "1115454")
        mountedComponent.setInputValue('[id="address"]', "Some Address")
        mountedComponent.setInputValue('[id="mobile"]', "1115454")
        mountedComponent.setInputValue('[id="email"]', "someone@somemail.com")
        mountedComponent.setInputValue('[id="age"]', "95")
        mountedComponent.setInputValue('[id="name"]', "somename")

        await mountedComponent.submitForm("form")

        await mountedComponent.reload();
        mountedComponent.expectLocationToBe("/user-history")

        mountedComponent.verifyOnComplete(() => {

        const args = httpPostSpy.mock.calls[0]
            console.log(args)
            expect(httpPostSpy).toBeCalled()




        })






    });



});
