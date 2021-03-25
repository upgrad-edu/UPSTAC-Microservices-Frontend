import {initMockAxios, resetMockAxios} from "../../../__testshared/shared/frameworks/mock-http";
import {setupMocksForGetMyConsultationHistory} from "../../../__testshared/shared/api/mock-consultation";
import {mountComponentWithStoreAndHistory} from "../../../__testshared/shared/component-helper";
import ConsultationHistory from "../../consultation/ConsultationHistory";
import {
    getStoreForGovernmentAuthority,
    getStoreForLoggedInTester
} from "../../../__testshared/shared/store/mock-store-service";
import React from "react";
import LabHistory from "../../lab/LabHistory";
import {setupMocksForGetMyLabHistory} from "../../../__testshared/lab/mock-lab";


describe('Lab History tests', () => {

    beforeEach(() => {
        initMockAxios();

    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });

    it('Lab History should load all data', async () => {

        setupMocksForGetMyLabHistory();


        const mountedComponent = mountComponentWithStoreAndHistory(<LabHistory/>,
            getStoreForLoggedInTester())


        await mountedComponent.waitForDomLoad();



        const container= mountedComponent.getContainer()

        const buttons =container.find("button").filterWhere((node) => {
            return node.html().toUpperCase().indexOf("UPDATE") >=0;

        });



        expect(buttons).not.toBeNull()
        expect(buttons.length).toBeGreaterThan(0)


        buttons.at(0).simulate('click');
        await mountedComponent.reload();

        mountedComponent.expectLocationContains("update-lab-report")




    });




});

