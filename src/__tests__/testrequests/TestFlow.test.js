import {mount} from "enzyme";
import Forbidden from "../../component/Forbidden";
import {LoadingView} from "../../component/LoadingView";
import React from "react";
import {createCompletedWith, createRequestWith} from "../../../__testshared/shared/data/testrequests";
import TestFlow from "../../testrequests/TestFlow";
import LabResultDetail from "../../testrequests/LabResultDetail";
import ConsultationResultDetail from "../../testrequests/ConsultationResultDetail";
import {setupMocksForTestFlow} from "../../../__testshared/shared/api/mock-testrequests";
import {initMockAxios, resetMockAxios} from "../../../__testshared/shared/frameworks/mock-http";
import {setupMocksForGetMyConsultationHistory} from "../../../__testshared/shared/api/mock-consultation";
import {setupMocksForAllRequests} from "../../../__testshared/shared/api/mock-authority";
import {mountComponentWithStoreAndHistory} from "../../../__testshared/shared/component-helper";
import RequestHistory from "../../testrequests/RequestHistory";
import {doGetMyConsultationHistory} from "../../consultation/consultationDispatcher";
import {getStoreForLoggedInDoctor} from "../../../__testshared/shared/store/mock-store-service";
import {TableRow} from "../../component";


describe('Testflow tests', () => {
    beforeEach(() => {
        initMockAxios();

    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });

    it('should render TestFlow With LabResultDetail and  ConsultationResultDetail ', async () => {


        const testRequest = createCompletedWith(2, "Zinda")
        setupMocksForTestFlow(2)


        const mountedComponent = mountComponentWithStoreAndHistory(<TestFlow testRequest={testRequest}></TestFlow>,
            getStoreForLoggedInDoctor())


        await mountedComponent.waitForDomLoad();

        const container = mountedComponent.getContainer()

        expect(container.find(LabResultDetail)).toHaveLength(1);
        expect(container.find(ConsultationResultDetail)).toHaveLength(1);

        expect(container.find(ConsultationResultDetail).html()).not.toBeNull()
        expect(container.find(TableRow).length).toBeGreaterThan(1);


    });


    it('should render TestFlow With LabResultDetail for DIAGNOSIS_IN_PROCESS ', async () => {


        const testRequest = createRequestWith(2, "Zinda","DIAGNOSIS_IN_PROCESS")
        setupMocksForTestFlow(2)


        const mountedComponent = mountComponentWithStoreAndHistory(<TestFlow testRequest={testRequest}></TestFlow>,
            getStoreForLoggedInDoctor())


        await mountedComponent.waitForDomLoad();

        const container = mountedComponent.getContainer()

        expect(container.find(LabResultDetail)).toHaveLength(1);
        expect(container.find(ConsultationResultDetail).html()).toBeNull()
        expect(container.find(TableRow).length).toBeGreaterThan(1);


    });


    it('should render TestFlow Without LabResultDetail for INITIATED ', async () => {


        const testRequest = createRequestWith(2, "Zinda","INITIATED")
        setupMocksForTestFlow(2)


        const mountedComponent = mountComponentWithStoreAndHistory(<TestFlow testRequest={testRequest}></TestFlow>,
            getStoreForLoggedInDoctor())


        await mountedComponent.waitForDomLoad();

        const container = mountedComponent.getContainer()

        expect(container.find(LabResultDetail).html()).toBeNull()
        expect(container.find(ConsultationResultDetail).html()).toBeNull()
        expect(container.find(TableRow).length).toBeGreaterThan(1);


    });
});
