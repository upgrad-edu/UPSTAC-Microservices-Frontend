import React from 'react';
import {initMockAxios, resetMockAxios} from "../../../__testshared/shared/frameworks/mock-http";
import {
    setupMocksForAllRequests,
    setupMocksForAllThreshold,
    setupMocksForAllThresholdError
} from "../../../__testshared/shared/api/mock-authority";
import AuthorityDashboard from "../../authority/AuthorityDashboard";
import {Bar, Doughnut} from "react-chartjs-2";
import {mountComponentWithStoreAndHistory} from "../../../__testshared/shared/component-helper";
import {getStoreForGovernmentAuthority} from "../../../__testshared/shared/store/mock-store-service";
import {
    getAllHomeQuarantineAdmitChartDetails,
    getAllPostiveNegativeChartDetails
} from "../../authority/shared/dashboard-charts";


describe('Authority Dashboard tests', () => {

    beforeEach(() => {
        initMockAxios();


    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });


    it('All charts should load after data gets loaded', async () => {

        setupMocksForAllThreshold();
        setupMocksForAllRequests();

        const mountedComponent = mountComponentWithStoreAndHistory(<AuthorityDashboard/>,
            getStoreForGovernmentAuthority())


        await mountedComponent.waitForDomLoad();


        const container= mountedComponent.getContainer()
        mountedComponent.verifyOnComplete(()=>{

            expect(container.find(Doughnut)).not.toBeNull()
            container.find(Doughnut).forEach((node) => {
                expect(node.props("data")).not.toBeNull()
                expect(node.props("data").data).not.toBeNull()
                expect(node.props("data").data.datasets).not.toBeNull()
                expect(node.props("data").data.datasets.length).toBeGreaterThan(0)

            });
            container.find(Bar).forEach((node) => {
                const actualNode = node.props("data");
                expect(actualNode).not.toBeNull()
                expect(actualNode.data).not.toBeNull()
                expect(actualNode.data.datasets).not.toBeNull()
                expect(actualNode.data.datasets.length).toBeGreaterThan(0)

            });

        })






    });

    it('AuthorityDashboard should throw error , when server is down', async () => {

        setupMocksForAllThresholdError();

        const mountedComponent = mountComponentWithStoreAndHistory(<AuthorityDashboard/>,
            getStoreForGovernmentAuthority())


        await mountedComponent.waitForDomLoad();

        const container = mountedComponent.getContainer()

        process.nextTick(() =>{

            container.find(Bar).forEach((node) => {

                const actualNode = node.props("data");

                expect(actualNode.data.datasets).toBeUndefined()


            });
        })

    });


});

