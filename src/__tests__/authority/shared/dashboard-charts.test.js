import {initMockAxios, resetMockAxios} from "../../../../__testshared/shared/frameworks/mock-http";
import {
    getAllHomeQuarantineAdmitChartDetails,
    getAllPostiveNegativeChartDetails
} from "../../../authority/shared/dashboard-charts";
import {
    setupMocksForAllRequests,
    setupMocksForAllThreshold,
    setupMocksForAllThresholdError
} from "../../../../__testshared/shared/api/mock-authority";
import {mountComponentWithStoreAndHistory} from "../../../../__testshared/shared/component-helper";
import AuthorityDashboard from "../../../authority/AuthorityDashboard";
import {getStoreForGovernmentAuthority} from "../../../../__testshared/shared/store/mock-store-service";
import {Bar, Doughnut} from "react-chartjs-2";
import React from "react";



const pinCodes =  [
    { positiveCount: 4,
        negativeCount: 2,
        homeQuarantineCount: 4,
        admittedCount: 0,
        testedCount: 4,
        zoneType: 'GREEN',
        pinCode: '110001' },

    { positiveCount: 4,
        negativeCount: 1,
        homeQuarantineCount: 4,
        admittedCount: 1,
        testedCount: 4,
        zoneType: 'GREEN',
        pinCode: '110005' },

]
describe('Dashboard  chart tests', () => {

    beforeEach(() => {



    });

    afterEach(() => {

    });

    it('getAllHomeQuarantineAdmitChartDetails should return proper values',  () => {




        const homequarantineResponse = getAllHomeQuarantineAdmitChartDetails(pinCodes)
        expect(homequarantineResponse.datasets.length).toBe(1)
        expect(homequarantineResponse.datasets[0].data.length).toBe(2)
    });
    it('getAllPostiveNegativeChartDetails should return proper values',  () => {


        const allPostiveNegativeChartDetails = getAllPostiveNegativeChartDetails(pinCodes)
        expect(allPostiveNegativeChartDetails.datasets.length).toBe(1)
        expect(allPostiveNegativeChartDetails.datasets[0].data.length).toBe(2)
    });

});

