import {allThresholdsResponse} from "../../../../__testshared/shared/data/threshold-responses";
import {
    createInitiatedRequestWith,
    createLabTestCompletedWith,
    getAllTestRequests
} from "../../../../__testshared/shared/data/testrequests";
import {mergeTestRequestsAndThresholdDetails} from "../../../authority/shared/authority-data-parser";
import {getRequestHistoryOptions} from "../../../authority/shared/view-all-request-options";
import {mountComponentWithStoreAndHistory} from "../../../../__testshared/shared/component-helper";
import AuthorityDashboard from "../../../authority/AuthorityDashboard";
import {getStoreForGovernmentAuthority} from "../../../../__testshared/shared/store/mock-store-service";
import React from "react";
import {setupMocksForTestFlow} from "../../../../__testshared/shared/api/mock-testrequests";
import TestFlow from "../../../testrequests/TestFlow";
import {initMockAxios, resetMockAxios} from "../../../../__testshared/shared/frameworks/mock-http";
import {Table, TableBody} from "@material-ui/core";

describe('View All Request Options Tests', () => {

    beforeEach(() => {
        initMockAxios();


    });

    afterEach(() => {
        resetMockAxios();
        jest.restoreAllMocks()
    });
    it('isRowExpandable should return false for test request status Initiated', () => {

        const items = []
        items.push(createInitiatedRequestWith(1, "USER"))
        items.push(createLabTestCompletedWith(2, "AnotherUSER"))
        const options = getRequestHistoryOptions(items);
        expect(options.isRowExpandable(0, false)).toBe(false)
        expect(options.isRowExpandable(1, false)).toBe(true)


    });
    it('renderExpandableRow should mount properly for Index', async () => {

        const items = []
        items.push(createLabTestCompletedWith(2, "AnotherUSER"))
        const options = getRequestHistoryOptions(items);

        const dataIndex=0
        setupMocksForTestFlow(2)
            const rowData =['a','b'];
            const rowMeta ={dataIndex};

            const element =<Table>
                <TableBody>
                {options.renderExpandableRow(rowData,rowMeta)}
                </TableBody>
            </Table>
        const mountedComponent = mountComponentWithStoreAndHistory(element,
            getStoreForGovernmentAuthority())


        await mountedComponent.waitForDomLoad();

        const component =mountedComponent.getContainer();
mountedComponent.verifyOnComplete(()=>{

    expect(component.find(TestFlow)).not.toBeNull();

})

    });

});
