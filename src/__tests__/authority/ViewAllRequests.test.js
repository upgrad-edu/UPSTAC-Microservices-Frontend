import {initMockAxios, resetMockAxios} from "../../../__testshared/shared/frameworks/mock-http";
import {setupMocksForAllRequests, setupMocksForAllThreshold} from "../../../__testshared/shared/api/mock-authority";
import {mountComponentWithStoreAndHistory} from "../../../__testshared/shared/component-helper";
import {getStoreForGovernmentAuthority} from "../../../__testshared/shared/store/mock-store-service";
import MUIDataTable from "mui-datatables";
import React from "react";
import ViewAllRequests from "../../authority/ViewAllRequests";


describe('View All Request History tests', () => {

    beforeEach(() => {
        initMockAxios();

    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });

    it('View AllRequestHistory should load  data after it gets loaded', async () => {

        setupMocksForAllThreshold();
        setupMocksForAllRequests();

        const loadResults = (results)=>{
            expect(results).not.toBeNull();
            done()
        }

        const mountedComponent = mountComponentWithStoreAndHistory(<ViewAllRequests/>,
            getStoreForGovernmentAuthority())


        await mountedComponent.waitForDomLoad();



        const container= mountedComponent.getContainer()
        mountedComponent.verifyOnComplete(()=>{

            const record =container.find(MUIDataTable).props("data")
            expect(record).not.toBeNull()
            expect(record.data).not.toBeNull()
            expect(record.data.length).toBeGreaterThan(1)

        })



    });




});

