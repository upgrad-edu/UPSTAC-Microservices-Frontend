import {Button, React, useHistory, useState,} from "../component"
import {doGetMyConsultationHistory} from "./consultationDispatcher";
import RequestHistory from "../testrequests/RequestHistory";
import {Fragment} from "react";
import {useGlobalStyles} from "../styles/GlobalStyles";


function ConsultationHistory() {
//Based on the logged in user ,display his tests
    const classes = useGlobalStyles();
    const history = useHistory();

    const [requests, setRequests] = useState([]);

    async function onUpdateConsultationHistory(index){
        const currentRequest = requests[index]
        history.push("/update-consultation/" + currentRequest.requestId)


    }


    const actionColumns =[{
        name: 'Actions',
        options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRenderLite: (dataIndex) => {

                const currentRequest = requests[dataIndex]
                if(currentRequest && currentRequest.status && currentRequest.status == "DIAGNOSIS_IN_PROCESS"){
                    return   <div>

                        <Button  onClick={() => {
                            onUpdateConsultationHistory(dataIndex)
                        }} color="secondary" variant="outlined" className={classes.link}>
                            Update
                        </Button>



                    </div>
                }else{
                    return <Fragment></Fragment>
                }



            },
        }
    },]


    return (
        <RequestHistory actionColumns={actionColumns} getMyHistory={doGetMyConsultationHistory} onDataLoaded ={(results) => {
            setRequests(results)
        }}></RequestHistory>

    )
}

export default ConsultationHistory
