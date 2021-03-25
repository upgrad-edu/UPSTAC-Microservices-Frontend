import {
    Button,
    Container,
    FormControl,
    Grid,
    makeStyles,
    React,
    TextField,
    Typography,
    useEffect,
    useHistory,
    useState
} from "../component"
import {doUpdateLabResult} from "./labDispatcher";
import {appNotification} from "../shared/notification/app-notification";
import {useLocation, useRouteMatch} from "react-router-dom";
import {useDispatch} from "react-redux";
import {doGetTestRequestByID} from "../testrequests/testRequestDispatcher";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TestRequestDetail from "../testrequests/TestRequestDetail";
import {errorHandler} from "../shared/common-helpers";


const useStyles = makeStyles((theme) => ({
    paperWhite: {
        margin: "0 auto",
        padding: "20px 20px 20px 20px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor:'white',
    },
    mt40:{
        marginTop:40,
    },
    w100:{
        width: '100%',
    },
    select100Form:{
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    formContainer:{
      padding:"50 50 50 50"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function UpdateLabResult() {

    const classes = useStyles();

    const history = useHistory();
    let location = useLocation();
    let {params} = useRouteMatch("/update-lab-report/:id");
    const dispatch = useDispatch()
    const {id} =params
    const [testRequest, setTestRequest] = useState(null);

    const [bloodPressure, setBloodPressure] = useState('102');
    const [comments, setComments] = useState('Should be left');
    const [heartBeat, setHeartBeat] = useState('97');
    const [oxygenLevel, setOxygenLevel] = useState('95');
    const [temperature, setTemperature] = useState('98');
    const [result, setResult] = useState('NEGATIVE');
   // const [bloodPressure, setBloodPressure] = useState('');
   //  const [comments, setComments] = useState('');
   //  const [heartBeat, setHeartBeat] = useState('');
   //  const [oxygenLevel, setOxygenLevel] = useState('');
   //  const [temperature, setTemperature] = useState('');
   //  const [result, setResult] = useState('');






    function handleSubmit(event) {




        event.preventDefault();
        const payload = {
            bloodPressure,
            comments,
            heartBeat,
            oxygenLevel,
            result,
            temperature
        }
        doUpdateLabResult(id,payload)
            .subscribe((response) => {
                appNotification.showSuccess("Succesfully Updated Lab Result")
                history.push("/lab-history")

            }, errorHandler)

    }




    useEffect(() => {


        doGetTestRequestByID(id)
            .subscribe((result) => {
                setTestRequest(result)
                console.log(result)

            }, errorHandler)





    }, [])




    return (
        <React.Fragment>
            <Container component="main" className={classes.mt40}>


                 <Grid container spacing={2}  className={classes.paperWhite} >

                    <Typography component="h1" variant="h5">
                       Update Lab Result
                        <hr />
                    </Typography>
                    <Grid container spacing={2}  className={classes.formContainer} >

                        <Grid item xs={6} >
                            <TestRequestDetail testRequest={testRequest}></TestRequestDetail>

                        </Grid>
                        <Grid item xs={6} >
                            <form className={classes.form} onSubmit={handleSubmit} noValidate>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} >




                                        <TextField
                                            variant="outlined"
                                            value={bloodPressure}
                                            onInput={e => setBloodPressure(e.target.value)}
                                            required
                                            className={classes.w100}
                                            fullWidth
                                            id="bloodPressure"
                                            label="Blood Pressure"
                                            name="bloodPressure"
                                            autoComplete="bloodPressure"
                                        />



                                    </Grid>


                                    <Grid item xs={12} >
                                        <TextField
                                            variant="outlined"
                                            value={heartBeat}
                                            onInput={e => setHeartBeat(e.target.value)}
                                            required
                                            fullWidth
                                            id="heartBeat"
                                            label="Heart Beat"
                                            name="heartBeat"
                                            autoComplete="heartBeat"
                                        />
                                    </Grid>

                                    <Grid item xs={12} >
                                        <TextField
                                            variant="outlined"
                                            value={oxygenLevel}
                                            onInput={e => setOxygenLevel(e.target.value)}
                                            required
                                            fullWidth
                                            id="oxygenLevel"
                                            label="Oxygen Level"
                                            name="oxygenLevel"
                                            autoComplete="oxygenLevel"
                                        />
                                    </Grid>

                                    <Grid item xs={12} >
                                        <TextField
                                            variant="outlined"
                                            value={temperature}
                                            onInput={e => setTemperature(e.target.value)}
                                            required
                                            fullWidth
                                            id="temperature"
                                            label="Body Temperature"
                                            name="temperature"
                                            autoComplete="temperature"
                                        />
                                    </Grid>



                                    <Grid item xs={12} >


                                        <FormControl variant="outlined" className={classes.select100Form}>
                                            <InputLabel htmlFor="outlined-result-native-simple">Test Result</InputLabel>
                                            <Select
                                                native
                                                value={result}
                                                onChange={e => setResult(e.target.value)}
                                                label="Test Result"
                                                className={classes.select100}
                                                inputProps={{
                                                    name: 'result',
                                                    id: 'selectLabResult',
                                                }}
                                            >
                                                <option value="POSITIVE">Positive</option>
                                                <option value="NEGATIVE">Negative</option>
                                            </Select>
                                        </FormControl>




                                    </Grid>



                                    <Grid item xs={12}>

                                        <TextareaAutosize
                                            className={classes.w100}
                                            aria-label="comments"
                                            rowsMin={3}
                                            value={comments}
                                            name="comments"
                                            label="comments"

                                            id="comments"
                                            onInput={e => setComments(e.target.value)}
                                            placeholder="Comments" />

                                    </Grid>



                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Update Lab Result
                                </Button>

                            </form>

                        </Grid>
                    </Grid>


                 </Grid>

            </Container>
        </React.Fragment>

    )
}

export default UpdateLabResult
