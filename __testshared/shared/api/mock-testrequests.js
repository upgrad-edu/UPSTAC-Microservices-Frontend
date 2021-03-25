import {mockGet, mockPost} from "../frameworks/mock-http";
import {createRequestWith, getAllTestRequests} from "../data/testrequests";
import {
    doGetTestRequestByIDBaseUrl,
    doGetTestRequestFlowBaseUrl,
    TestRequestsUrl
} from "../../../src/testrequests/testRequestDispatcher";
import {getTestFlowResponse} from "../data/testrequest-flows";

export function setupMocksForTestFlow(testRequestId) {

    const inputUrl = doGetTestRequestFlowBaseUrl  + testRequestId;
    console.log("mock url" + inputUrl)
    mockGet(inputUrl, getTestFlowResponse())
}

export function setupMocksForCreateTestRequest(name) {

    mockPost(TestRequestsUrl , createRequestWith(1,name,"INITIATED"))
}
export function setupMocksForDoGetTestRequestByID(id) {

    mockGet(doGetTestRequestByIDBaseUrl + id , createRequestWith(id,"some name","COMPLETED"))
}
export function setupMocksForDoGetMyTestRequests() {

    mockGet(TestRequestsUrl , getAllTestRequests())
}
