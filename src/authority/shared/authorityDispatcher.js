import { environment } from "../../environment";
import http from "../../shared/services/http-service.js";
import { concatMap, map } from "rxjs/operators";
import { parseApprovalItems } from "./approval-parser";
import {
  getAllDataWithPinCodes,
  mergeTestRequestsAndThresholdDetails,
} from "./authority-data-parser";

// export const userLogin = (payload) => {
//     return {
//         type: LOGIN,
//         payload
//     }
// }
//

export const doGetThresholdsUrl =
  environment.baseUrl + "/api/government/all-thresholds";
export const doGetAllTestRequestsUrl =
  environment.baseUrl + "/api/government/all-requests";
export const doGetPendingApprovalsUrl =
  environment.baseUrl + "/api/government/pending-approvals";

export const doUpdateAllThresholdsUrl =
  environment.baseUrl + "/api/government/update-thresholds";

export const downloadDocumentBaseUrl = environment.DOWNLOAD_BASE_URL;

export const updateApprovalUrl =
  environment.baseUrl + "/api/government/update-approval";

export const doGetThresholds = () => {
  return http.get(doGetThresholdsUrl);
};
export const doGetAllTestRequests = (thresholds) => {
  return http.get(doGetAllTestRequestsUrl).pipe(
    map((items) => {
      return mergeTestRequestsAndThresholdDetails(items, thresholds);
    })
  );
};

export const doGetAllTestRequestsWithThreshold = () => {
  return doGetThresholds().pipe(
    concatMap((thresholds) => {
      return doGetAllTestRequests(thresholds);
    })
  );
};
export const doGetAnalytics = () => {
  return doGetThresholds().pipe(
    concatMap((thresholds) => doGetAnalyticsFromThresholds(thresholds))
  );
};

export const doGetAnalyticsFromThresholds = (thresholds) => {
  return http
    .get(doGetAllTestRequestsUrl)
    .pipe(map((items) => getAllDataWithPinCodes(items, thresholds)));
};
export const doGetPendingApprovals = () => {
  return http
    .get(doGetPendingApprovalsUrl)
    .pipe(map((items) => parseApprovalItems(items)));
};

export const doUpdateAllThresholds = (allThresholds) => {
  // thresholdType  RED,YELLOW,GREEN

  return http.post(doUpdateAllThresholdsUrl, allThresholds);
};

export const downloadDocument = (id, fileName) => {
  const url = downloadDocumentBaseUrl + id;

  http.downloadFileFromServer(url, fileName);
};

export function updateApproval(id, status) {
  let request = {
    status: status,
    userId: id,
  };

  return http.put(updateApprovalUrl, request);
}

export const doApproveUser = (id) => {
  return updateApproval(id, "APPROVED");
};

export const doRejectUser = (id) => {
  return updateApproval(id, "REJECTED");
};
