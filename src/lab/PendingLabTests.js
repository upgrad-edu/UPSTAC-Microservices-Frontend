import {Container, Grid, makeStyles, React, useEffect, useHistory, useState,} from "../component"
import MUIDataTable from "mui-datatables";
import {appNotification} from "../shared/notification/app-notification";
import {doAssignLabResult, doGetPendingTestRequests} from "./labDispatcher";
import {confirmMessageService} from "../shared/confirm/confirm-message-service";
import Button from '@material-ui/core/Button';

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import {useDispatch} from "react-redux";
import {useGlobalStyles} from "../styles/GlobalStyles";
import {errorHandler} from "../shared/common-helpers";




function PendingLabTests() {

    const classes = useGlobalStyles();
    const history = useHistory();
    const dispatch = useDispatch()
    const [data, setData] = useState([]);

    const [requests, setRequests] = useState([]);
    const columns = [

        {
            name: "Request ID",
            options: {
                filter: true,
            }
        },
        {
            name: "Name",
            options: {
                filter: true,
            }
        },
        {

            name: "Age",
            options: {
                filter: true,
            }
        },
        {

            name: "Status",
            options: {
                filter: true,
            }
        },
        {
            name: 'Actions',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex) => {

                    return    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<AssignmentIndIcon />}
                        onClick={() => {
                            onAssignToMeClicked(dataIndex)
                        }}
                    >
                        Assign to Me
                    </Button>

                },
            }
        }

    ];




    const options = {
        filter: true,
        filterType: 'dropdown',
        responsive: 'standard',
        selectableRows:'none',

    };


    async function onAssignToMeClicked(index){
        const pendingRequest = requests[index]


            await confirmMessageService.show("Do you want to Assign yourself for testing " + pendingRequest.name + "?")

            doAssignLabResult(pendingRequest.requestId).subscribe((res)=>{
                appNotification.showSuccess("Request Assigned to you, Please Goto "+ pendingRequest.address+" and  update the details.")

                history.push("/update-lab-report/" + pendingRequest.requestId)

            }, errorHandler);




    }



    function reloadTests() {

        doGetPendingTestRequests()
            .subscribe((pendingTests) => {
                console.log("pendingTests",pendingTests)

                setRequests(pendingTests)
                const buffer = pendingTests.map(item=>{

                    return [item.requestId,item.name,item.age,item.status]
                })

                const results = []
                results.push(buffer)
                setData(buffer)

            }, errorHandler)
    }


    useEffect(() => {


        reloadTests();





    }, [])



    return (
        <React.Fragment>
            <Container maxWidth="md" component="main" className={classes.heroContent}>
                <h1>
                   Pending Tests
                </h1>
                <hr />
            </Container>
            <Container component="main" maxWidth="md">
                <Grid container>
                    <Grid item md={12}>

                        <MUIDataTable title={"Pending Tests"} data={data} columns={columns} options={options} />

                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>

    )
}

export default PendingLabTests
