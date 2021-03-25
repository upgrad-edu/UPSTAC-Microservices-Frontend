import IconButton from "@material-ui/core/IconButton";
import AttachmentIcon from "@material-ui/icons/Attachment";
import {React, useSelector} from "../../component";
import {downloadDocument} from "../shared/authorityDispatcher";
import {useGlobalStyles} from "../../styles/GlobalStyles";

export function ViewAttachmentButton(props){
    const classes = useGlobalStyles();

    const {pendingUsers} = useSelector(state => state.authority);
    function onViewAttachmentClick(index){

        const pendingUser = pendingUsers[index]

        let fileName = pendingUser.userName + "-" + pendingUser.fileName;
        downloadDocument(pendingUser.id,fileName)

    }

    const {dataIndex} =props
    return  <IconButton aria-label="delete" className={classes.marginOneSpace}
                        onClick={() => {
                            onViewAttachmentClick(dataIndex)
                        }}
    >
        <AttachmentIcon fontSize="large" />
    </IconButton>
}
