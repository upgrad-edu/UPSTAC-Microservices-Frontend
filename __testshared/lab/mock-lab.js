import {environment} from "../../src/environment";
import {mockAny, mockGet, mockPost, mockPut, mockServerError} from "../shared/frameworks/mock-http";
import {createRequestWith, getAllTestRequests} from "../shared/data/testrequests";
import {doGetAllTestRequestsUrl, doUpdateAllThresholdsUrl} from "../../src/authority/shared/authorityDispatcher";
import {allThresholdsResponse} from "../shared/data/threshold-responses";
import {doGetTestRequestFlowBaseUrl, TestRequestsUrl} from "../../src/testrequests/testRequestDispatcher";
import {getTestFlowResponse} from "../shared/data/testrequest-flows";
import {
    doGetMyConsultationHistoryResponse,
    doGetPendingConsultationsResponse,
    getAssignConsultationResponse, getCompleteConsultationResponse
} from "../shared/data/consulation-responses";
import {
    doAssignConsultationBaseurl, doCompleteConsultationBaseurl,
    doGetMyConsultationHistoryUrl,
    doGetPendingConsultationsUrl
} from "../../src/consultation/consultationDispatcher";
import {
    doAssignLabResultBaseUrl,
    doGetMyLabHistoryUrl,
    doGetPendingTestRequestsUrl, doUpdateLabResultBaseUrl
} from "../../src/lab/labDispatcher";
import {
    getAssignLabResultResponseFor,
    doGetMyLabHistoryResponse,
    doGetPendingTestResponse, getUpdateLabResultResponseFor
} from "./lab-responses";




export function setupMocksForGetMyLabHistory() {

    mockGet(doGetMyLabHistoryUrl , doGetMyLabHistoryResponse)
}

export function setupMockErrorForGetMyLabHistory() {

    mockServerError(doGetMyLabHistoryUrl )
}




export function setupMocksForDoGetPendingTestRequests() {

    mockGet(doGetPendingTestRequestsUrl ,doGetPendingTestResponse)
}

export function setupMocksForDoAssignLabResult(id) {

    const inputUrl = doAssignLabResultBaseUrl +id;
    console.log("setupMocksForDoAssignLabResult",setupMocksForDoAssignLabResult)
    mockPut(inputUrl ,getAssignLabResultResponseFor(id))
}
export function setupMocksForDoUpdateLabResult(id) {

    mockPut(doUpdateLabResultBaseUrl +id ,getUpdateLabResultResponseFor(id))
}
