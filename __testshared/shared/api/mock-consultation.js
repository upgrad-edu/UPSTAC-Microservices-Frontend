import {environment} from "../../../src/environment";
import {mockAny, mockGet, mockPost, mockPut, mockServerError} from "../frameworks/mock-http";
import {createRequestWith, getAllTestRequests} from "../data/testrequests";
import {doGetAllTestRequestsUrl, doUpdateAllThresholdsUrl} from "../../../src/authority/shared/authorityDispatcher";
import {allThresholdsResponse} from "../data/threshold-responses";
import {doGetTestRequestFlowBaseUrl, TestRequestsUrl} from "../../../src/testrequests/testRequestDispatcher";
import {getTestFlowResponse} from "../data/testrequest-flows";
import {
    doGetMyConsultationHistoryResponse,
    doGetPendingConsultationsResponse,
    getAssignConsultationResponse, getCompleteConsultationResponse
} from "../data/consulation-responses";
import {
    doAssignConsultationBaseurl, doCompleteConsultationBaseurl,
    doGetMyConsultationHistoryUrl,
    doGetPendingConsultationsUrl
} from "../../../src/consultation/consultationDispatcher";


export function setupMocksForGetMyConsultationHistory() {

    mockGet(doGetMyConsultationHistoryUrl , doGetMyConsultationHistoryResponse)
}

export function setupMockErrorForGetMyConsultationHistory() {

    mockServerError(doGetMyConsultationHistoryUrl )
}

export function setupMocksForDoGetPendingConsultations() {

    mockGet(doGetPendingConsultationsUrl ,doGetPendingConsultationsResponse)
}

export function setupMocksForDoAssignConsultation(id) {

    mockPut(doAssignConsultationBaseurl +id ,getAssignConsultationResponse(id))
}
export function setupMocksForDoCompleteConsultation(id) {

    mockPut(doCompleteConsultationBaseurl +id ,getCompleteConsultationResponse(id))
}
