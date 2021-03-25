import {doGetPendingApprovals} from "./authorityDispatcher";
import {appNotification} from "../../shared/notification/app-notification";
import {LOGIN} from "../../auth/authStore";
import {UPDATE_PENDING_USERDATA} from "../store/authorityStore";

export function reloadPendingApprovals(dispatch) {

    doGetPendingApprovals()
        .subscribe((pendingUsers) => {

            dispatch({type: UPDATE_PENDING_USERDATA, "payload": pendingUsers});
        }, (error => {

            // console.log(error)
            appNotification.showError(error)
        }))
}
