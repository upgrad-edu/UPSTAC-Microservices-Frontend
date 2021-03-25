import {Button, makeStyles, React, useState,} from "../component"
import {doGetMyTestRequests} from "./testRequestDispatcher";
import RequestHistory from "./RequestHistory";
import {Fragment} from "react";


function UserHistory() {


    const [requests, setRequests] = useState([]);

    function getResult(dataIndex){
        const currentRequest = requests[dataIndex]
        if(currentRequest && currentRequest.labResult && currentRequest.labResult.result){
            return currentRequest.labResult.result

        }else {
            return ""
        }


    }
    function getSuggestion(dataIndex){
        const currentRequest = requests[dataIndex]
        if(currentRequest && currentRequest.consultation && currentRequest.consultation.suggestion){
            return currentRequest.consultation.suggestion

        }else {
            return ""
        }


    }



    const actionColumns =[{
        name: 'Result',
        options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRenderLite: (dataIndex) => {


                const result = getResult(dataIndex)
                    return <div className={result}>
                        {result}
                        </div>





            },
        }
    },{
        name: 'Doctor Suggestion',
        options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRenderLite: (dataIndex) => {


                const result = getSuggestion(dataIndex)
                return <div className={result}>
                    {result}
                </div>



            },
        }
    },]


    return (
        <RequestHistory onDataLoaded ={(results) => {
            setRequests(results)
        }} actionColumns={actionColumns} getMyHistory={doGetMyTestRequests} ></RequestHistory>

    )


}

export default UserHistory
