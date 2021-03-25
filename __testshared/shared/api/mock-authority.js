import {environment} from "../../../src/environment";
import {mockAny, mockGet, mockServerError} from "../frameworks/mock-http";
import {
    doGetAllTestRequestsUrl,
    doGetPendingApprovalsUrl,
    doGetThresholdsUrl, doUpdateAllThresholdsUrl, downloadDocumentBaseUrl, updateApprovalUrl
} from "../../../src/authority/shared/authorityDispatcher";
import {getAllTestRequests} from "../data/testrequests";
import {allThresholdsResponse} from "../data/threshold-responses";
import {pendingApprovalResponse} from "../data/authority-responses";
import {createMockedUserWithRoleAndStatus} from "../data/auth-responses";
import http from "../../../src/shared/services/http-service";

//
//
// export const doGetThresholdsUrl = environment.baseUrl + '/api/government/all-thresholds';
// export const doGetAllTestRequestsUrl = environment.baseUrl + '/api/government/all-requests';
// export const doGetPendingApprovalsUrl = environment.baseUrl + '/api/government/pending-approvals';
//
// export const doUpdateAllThresholdsUrl = environment.baseUrl + '/api/government/update-thresholds';
//
// export const downloadDocumentBaseUrl = environment.baseUrl + '/documents/download/';
// export const updateApprovalUrl = environment.baseUrl + '/api/government/update-approval';


export function setupMocksForAllThreshold() {

    mockAny(doGetThresholdsUrl, allThresholdsResponse)
}

export function setupMocksForUpdateThreshold() {

    mockAny(doUpdateAllThresholdsUrl, allThresholdsResponse)
}

export const setupMocksForDownloadDocument = (id) => {

    const url = downloadDocumentBaseUrl + id;

    const response ={
        headers:{},
        data:"Some Data",
    }
    mockAny(url,response)



}

export function setupMocksForAllThresholdError() {

    mockServerError(doGetThresholdsUrl)
}

export function setupMocksForAllRequests() {


    mockAny(doGetAllTestRequestsUrl, getAllTestRequests())
}

export function setupMocksForPendingApprovals() {


    mockAny(doGetPendingApprovalsUrl, pendingApprovalResponse)
}

export function setupMocksForUpdateApproval(name,role) {


    mockAny(updateApprovalUrl, createMockedUserWithRoleAndStatus(name,role,"APPROVED"))
}
export function setupMocksForRejectApproval(name,role) {


    mockAny(updateApprovalUrl, createMockedUserWithRoleAndStatus(name,role,"REJECTED"))
}

export function setupErrorMocksForUpdateApproval() {


    mockServerError(updateApprovalUrl)
}

export function setupErrorMocksForPendingApprovals() {

    mockServerError(doGetPendingApprovalsUrl)
}

