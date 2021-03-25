import {getAsUser} from "../../auth/user";
import {environment} from "../../environment";

export function parseApprovalItem(response) {
    const {contentType, fileName, id, url, user} = response
    const result = getAsUser(user);
    let documentUrl = environment.baseUrl + url
    return {...result, contentType, fileName, documentId: id, documentUrl};
}

export  function parseApprovalItems(items) {
    return items.map(response =>parseApprovalItem(response));
}
