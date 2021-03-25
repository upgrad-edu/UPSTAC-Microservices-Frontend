import {
    Container,
    Grid,
    makeStyles,
    Paper,
    React,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow, useEffect,
    useSelector,
} from "../component"
import {doGetMyTestRequests, doGetTestRequestFlow} from "./testRequestDispatcher";
import {appNotification} from "../shared/notification/app-notification";
import {useState} from "react";
import TableHead from "@material-ui/core/TableHead";
import {withStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TestRequestDetail from "./TestRequestDetail";
import LabResultDetail from "./LabResultDetail";
import ConsultationResultDetail from "./ConsultationResultDetail";
import {errorHandler} from "../shared/common-helpers";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);



const useStyles = makeStyles((theme) => ({

    heroContent: {
        padding: theme.spacing(3, 0, 2),
    },
    table: {
        minWidth: 700,
    },
    dateColumn:{
        width:130
    }
}));






function TestFlow(props) {

    const classes = useStyles();

    const {testRequest} = props

    const {requestId} =testRequest
    const [rows,setRows] = useState([])

    let labResult=null
    let consultation=null

    if(testRequest.status !== "INITIATED" && testRequest.status !== "LAB_TEST_IN_PROGRESS" )
        labResult=testRequest.labResult;

    if(testRequest.status === "COMPLETED"  )
        consultation=testRequest.consultation;

    function reloadRows(){

        doGetTestRequestFlow(requestId)
            .subscribe((results) => {
                console.log(results)
                setRows(results)

            }, errorHandler)

    }


    useEffect(() => {


        reloadRows();



    }, [])




    return (
        <React.Fragment>


            <Grid container spacing={2}  className={classes.formContainer} >

                {/*<Grid item xs={12} >*/}
                {/*    <TestRequestDetail testRequest={testRequest}></TestRequestDetail>*/}
                {/*</Grid>*/}
                <Grid item xs={6} >


                    <LabResultDetail labResult={labResult}></LabResultDetail>


                </Grid>
                <Grid item xs={6} >

                    <ConsultationResultDetail consultation={consultation}></ConsultationResultDetail>
                </Grid>
            </Grid>


                <Container maxWidth="md" component="main" className={classes.heroContent}>
                <h4>
                    TestRequest Flow
            </h4>
                <hr />
            </Container>
            <Container maxWidth="md">

                    <Grid md={12} item>

                        <Table className={classes.table} aria-label="Data Flow">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Id</StyledTableCell>
                                    <StyledTableCell className={classes.dateColumn}>Date</StyledTableCell>
                                    <StyledTableCell align="right">From Status</StyledTableCell>
                                    <StyledTableCell align="right">To Status</StyledTableCell>
                                    <StyledTableCell align="right">Done By</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {rows.map((row) => (
                                    <StyledTableRow  key={row.id}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.id}
                                        </StyledTableCell>
                                        <StyledTableCell className={classes.dateColumn} align="right">{row.happenedOn}</StyledTableCell>
                                        <StyledTableCell align="right">{row.fromStatus}</StyledTableCell>
                                        <StyledTableCell align="right">{row.toStatus}</StyledTableCell>
                                        <StyledTableCell align="right">{row.changedBy.userName}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>



                    </Grid>

            </Container>

        </React.Fragment>
    )
}

export default TestFlow
