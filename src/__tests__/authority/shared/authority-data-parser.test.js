//import MockAdapter from 'axios-mock-adapter';
import React from "react";
import {getMockedUserDetailsResponseForNormalUser} from "../../../../__testshared/shared/data/auth-responses";


import reducer, {initialState, LOGIN, LOGOUT} from '../../../auth/authStore';
import {getAsUser} from "../../../auth/user";
import {REHYDRATE} from "redux-persist";
import {
    mergeTestRequestsAndThresholdDetails,
    mergeZoneStatusWithPincode
} from "../../../authority/shared/authority-data-parser";
import {allThresholdsResponse} from "../../../../__testshared/shared/data/threshold-responses";
import {getAllTestRequests} from "../../../../__testshared/shared/data/testrequests";



describe('Authority Data  Parser Tests', () => {



    it('should parse data', () => {
        const thresholds =allThresholdsResponse
      const items =  getAllTestRequests()
        //const {items,thresholds}= initialData
       const results= mergeTestRequestsAndThresholdDetails(items,thresholds);

        expect(results).not.toBeNull();

    });
    it('should update zone data on pincodes based on thresholds', () => {



        const pinCodes =  [
            { positiveCount: 20,
                negativeCount: 2,
                homeQuarantineCount: 4,
                admittedCount: 0,
                testedCount: 4,
                zoneType: '',
                pinCode: '110001' },

            { positiveCount: 9,
                negativeCount: 1,
                homeQuarantineCount: 4,
                admittedCount: 1,
                testedCount: 4,
                zoneType: '',
                pinCode: '110005' },
            { positiveCount: 4,
                negativeCount: 1,
                homeQuarantineCount: 4,
                admittedCount: 1,
                testedCount: 4,
                zoneType: '',
                pinCode: '110005' },

        ]

        const thresholds =allThresholdsResponse

       const results= mergeZoneStatusWithPincode(thresholds,pinCodes);

        expect(results).not.toBeNull();
        results.forEach(result =>{

            expect(result.zoneType.trim().length).toBeGreaterThan(0)
        })

    });

});

