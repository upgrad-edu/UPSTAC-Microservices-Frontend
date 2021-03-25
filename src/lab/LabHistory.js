import {Button, React, useHistory, useState,} from "../component"
import {doGetMyLabHistory} from "./labDispatcher";
import RequestHistory from "../testrequests/RequestHistory";
import {Fragment} from "react";
import {useGlobalStyles} from "../styles/GlobalStyles";


function LabHistory() {

    const classes = useGlobalStyles();
    const history = useHistory();

    const [requests, setRequests] = useState([]);

    async function onUpdateLabHistory(index){
        const currentRequest = requests[index]
        console.log(currentRequest)
        history.push("/update-lab-report/" + currentRequest.requestId)


    }


    const actionColumns =[{
        name: 'Actions',
        options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRenderLite: (dataIndex) => {

                const currentRequest = requests[dataIndex]
                if(currentRequest && currentRequest.status && currentRequest.status == "LAB_TEST_IN_PROGRESS"){
                    return   <div>

                        <Button onClick={() => {
                            onUpdateLabHistory(dataIndex)
                        }} color="secondary" variant="outlined" className={classes.link}>
                            Update
                        </Button>



                    </div>
                }else{
                    return <Fragment></Fragment>
                }



            },
        }
    }]

    return (
      <RequestHistory actionColumns={actionColumns} getMyHistory={doGetMyLabHistory} onDataLoaded ={(results) => {
          setRequests(results)
      }}></RequestHistory>

    )
}

export default LabHistory
