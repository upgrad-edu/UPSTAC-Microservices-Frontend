import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import {React, useSelector} from "../../component";
import {confirmMessageService} from "../../shared/confirm/confirm-message-service";
import {doApproveUser, doRejectUser, downloadDocument} from "../shared/authorityDispatcher";
import {appNotification} from "../../shared/notification/app-notification";
import {useDispatch} from "react-redux";
import {reloadPendingApprovals} from "../shared/pending-user-utils";
import {useGlobalStyles} from "../../styles/GlobalStyles";
import {errorHandler} from "../../shared/common-helpers";

export function PendingApprovalActions(props){
    const classes = useGlobalStyles();
    const {dataIndex} =props

    const {pendingUsers} = useSelector(state => state.authority);
    const dispatch = useDispatch()



    async function onApproveUserClick(index){
        const pendingUser = pendingUsers[index]


        await confirmMessageService.show("Do you want to approve " + pendingUser.userName + "?")
        console.log("confirmMessageService approve user")
        doApproveUser(pendingUser.id).subscribe((res)=>{
            console.log("doApproveUser complete ")
            appNotification.showSuccess("Successfully approved " + pendingUser.role + "  " + pendingUser.firstName)

            reloadPendingApprovals(dispatch);
        }, errorHandler);



    }

    async function onRejectUserClick(index){
        const pendingUser = pendingUsers[index]


        await confirmMessageService.show("Do you want to Reject " + pendingUser.userName + "?")

        doRejectUser(pendingUser.id).subscribe((res)=>{
            appNotification.showSuccess("Rejected " + pendingUser.role + "  " + pendingUser.firstName)
            reloadPendingApprovals(dispatch);
        }, errorHandler);



    }

    return <div>

        <IconButton aria-label="Approve" color="primary"
                    onClick={() => {
                        onApproveUserClick(dataIndex)
                    }}
                    title="Approve" className={classes.button}>
            <CheckIcon fontSize="large" title="Approve" />
        </IconButton>
        <IconButton aria-label="Reject" color="secondary"
                    onClick={() => {
                        onRejectUserClick(dataIndex)
                    }}
                    title="Reject" className={classes.button}>
            <ClearIcon fontSize="large" title="Reject" />
        </IconButton>



    </div>

}
