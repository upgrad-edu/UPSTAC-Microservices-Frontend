import {initMockAxios, resetMockAxios} from "../../../__testshared/shared/frameworks/mock-http";
import {setupMocksForAllRequests, setupMocksForAllThreshold} from "../../../__testshared/shared/api/mock-authority";
import {mountComponentWithStoreAndHistory} from "../../../__testshared/shared/component-helper";
import React from "react";
import RequestHistory from "../../testrequests/RequestHistory";
import {doGetMyConsultationHistory} from "../../consultation/consultationDispatcher";
import {getStoreForLoggedInDoctor} from "../../../__testshared/shared/store/mock-store-service";
import MUIDataTable from "mui-datatables";
import {
    setupMockErrorForGetMyConsultationHistory,
    setupMocksForGetMyConsultationHistory
} from "../../../__testshared/shared/api/mock-consultation";
import {appNotification} from "../../shared/notification/app-notification";

describe('Request History tests', () => {

    beforeEach(() => {
        initMockAxios();

    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });

    it('RequestHistory should call ondata loaded after data gets loaded', async (done) => {

        setupMocksForGetMyConsultationHistory();
        setupMocksForAllRequests();

        const loadResults = (results)=>{
            expect(results).not.toBeNull();
            done()
        }

        const mountedComponent = mountComponentWithStoreAndHistory(<RequestHistory
                getMyHistory={doGetMyConsultationHistory}
                onDataLoaded ={loadResults}/>,
            getStoreForLoggedInDoctor())


        await mountedComponent.waitForDomLoad();





    });
    it('RequestHistory should call ondata loaded after data gets loaded and action columns should also render', async (done) => {

        setupMocksForGetMyConsultationHistory();
        setupMocksForAllRequests();

        const loadResults = (results)=>{
            expect(results).not.toBeNull();
            done()
        }

        const mountedComponent = mountComponentWithStoreAndHistory(<RequestHistory
                getMyHistory={doGetMyConsultationHistory}
                onDataLoaded ={loadResults}/>,
            getStoreForLoggedInDoctor())


        await mountedComponent.waitForDomLoad();





    });

    it('RequestHistory should render fine if ondataloaded parameter not supplied', async () => {

        setupMocksForGetMyConsultationHistory();
        setupMocksForAllRequests();



        const mountedComponent = mountComponentWithStoreAndHistory(<RequestHistory
                getMyHistory={doGetMyConsultationHistory}
               />,
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

    it('RequestHistory should call throw error , when server is down', async () => {
        const showErrorSpy=  jest.spyOn(appNotification, 'showError')

        setupMockErrorForGetMyConsultationHistory();

        const mountedComponent = mountComponentWithStoreAndHistory(<RequestHistory
                getMyHistory={doGetMyConsultationHistory}
            />,
            getStoreForLoggedInDoctor())



        await mountedComponent.reload();

        mountedComponent.verifyOnComplete(()=>{
            expect(showErrorSpy).toHaveBeenCalled()

        })

    });


});

