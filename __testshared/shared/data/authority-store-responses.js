import { allThresholdsResponse } from "./threshold-responses";
import { environment } from "./../../../src/environment";

let allApprovalStoreData = {
  pendingUsers: [
    {
      id: 209,
      userName: "doctorunknown",
      age: 56,
      gender: "MALE",
      address: "183/H - Clark Street,New Delhi",
      firstName: "doctorunknown",
      email: "doctorunknown@upgrad.com",
      lastName: "",
      phoneNumber: "9629157389",
      pinCode: 110001,
      created: "2020-09-05T17:31:59.847Z",
      updated: "2020-09-05T17:31:59.847Z",
      role: "DOCTOR",
      contentType: "image/png",
      fileName: "id-1.png",
      documentId: 1,
      documentUrl: environment.DOWNLOAD_BASE_URL + "209",
    },
    {
      id: 211,
      userName: "testerunknown",
      age: 67,
      gender: "FEMALE",
      address: "201/D - Lakeview Drive,Mumbai",
      firstName: "testerUnknown",
      email: "testerunknown@upgrad.com",
      lastName: "",
      phoneNumber: "9629153652",
      pinCode: 400001,
      created: "2020-09-05T17:32:00.172Z",
      updated: "2020-09-05T17:32:00.172Z",
      role: "TESTER",
      contentType: "image/png",
      fileName: "id-1.png",
      documentId: 3,
      documentUrl: environment.DOWNLOAD_BASE_URL + "211",
    },
    {
      id: 212,
      userName: "testeranotherunknown",
      age: 64,
      gender: "MALE",
      address: "106/D - Cedar Avenue,Mumbai",
      firstName: "testeranotherUnknown",
      email: "testeranotherunknown@upgrad.com",
      lastName: "",
      phoneNumber: "9629155562",
      pinCode: 400001,
      created: "2020-09-05T17:32:00.320Z",
      updated: "2020-09-05T17:32:00.320Z",
      role: "TESTER",
      contentType: "image/png",
      fileName: "id-2.png",
      documentId: 4,
      documentUrl: environment.DOWNLOAD_BASE_URL + "212",
    },
  ],
  pendingUsersLoaded: true,
  pendingUserGridData: [
    ["doctorunknown", "doctorunknown@upgrad.com", "DOCTOR"],
    ["testerUnknown", "testerunknown@upgrad.com", "TESTER"],
    ["testeranotherUnknown", "testeranotherunknown@upgrad.com", "TESTER"],
  ],
};

export function getLoadedAuthorityStore() {
  return { ...allApprovalStoreData, thresholds: allThresholdsResponse };
}
export function getEmptyAuthorityStore() {
  return {
    thresholds: {},
    pendingUsers: [],
    pendingUserGridData: [],
    pendingUsersLoaded: false,
  };
}
