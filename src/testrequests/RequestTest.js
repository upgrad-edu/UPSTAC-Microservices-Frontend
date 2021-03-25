import {
    Button,
    Container,
    FormControl,
    Grid,
    makeStyles,
    React,
    TextField,
    Typography,
    useHistory,
    useSelector,
    useState
} from "../component"
import {appNotification} from "../shared/notification/app-notification";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {doCreateTestRequest} from "./testRequestDispatcher";
import {errorHandler} from "../shared/common-helpers";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    select100:{
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

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function RequestTest() {

    const classes = useStyles();
    const history = useHistory();
    const [forMe,setForMe] = useState(false);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [shrink, setShrink] = useState(false);
    const [phoneNumber,setPhoneNumber] = useState("");
    const [pinCode, setPinCode] = useState('');
    // const [name, setName] = useState('user');
    // const [address, setAddress] = useState('some address ,some day');
    // const [age, setAge] = useState('25')
    // const [email, setEmail] = useState('user@upgrad.com');
    // const [gender, setGender] = useState("MALE");
    // const [phoneNumber,setPhoneNumber] = useState("45454545");
    // const [pinCode, setPinCode] = useState('45787878');
    const [isAgreed, setIsAgreed] = useState(false);

    const {user} = useSelector(state => state.auth);

    function toggleTestForMe(){
        const toggledState = !forMe
        setForMe(toggledState)
        if(toggledState){


            console.log(user)
            setName(user.firstName )
           setAddress(user.address)
            setAge(user.age)
            setEmail(user.email)
            setGender(user.gender)

            setPhoneNumber(user.phoneNumber)
            setPinCode(user.pinCode)
            setShrink(true)

        }
    }


    function handleSubmit(event) {
        event.preventDefault();

        const payload = {

            name,
            gender,
            address,
            age,
            email,
            phoneNumber,
            pinCode


        }
        console.log(payload)

        doCreateTestRequest(payload)
            .subscribe((response) => {

                console.log("doCreateTestRequest",response)
                appNotification.showSuccess("Test Request Created")
                history.push("/user-history")
            }, errorHandler)

    }

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">

                <div className={classes.paper}>

                    <Typography component="h1" variant="h5">
                        Request For Test
                        <hr />
                    </Typography>


                    <form className={classes.form} onSubmit={handleSubmit} noValidate>

                        <Grid container spacing={2}>
                            <Grid item xs={12} >


                                <FormControl variant="outlined" className={classes.select100Form}>
                                    <InputLabel htmlFor="outlined-testfor-native-simple">Test For</InputLabel>
                                    <Select
                                        native
                                        value={forMe}
                                        onChange={e => toggleTestForMe()}
                                        label="Test For"
                                        className={classes.select100}
                                        inputProps={{
                                            name: 'testfor',
                                            id: 'select-test-for-me',
                                        }}
                                    >
                                        <option value="true">Myself</option>
                                        <option value="false">Other</option>
                                    </Select>
                                </FormControl>




                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    value={name}
                                    onInput={e => setName(e.target.value)}
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <FormControl variant="outlined" className={classes.select100Form}>
                                    <InputLabel htmlFor="outlined-gender-native-simple">Gender</InputLabel>
                                    <Select
                                        className={classes.select100}
                                        native
                                        value={gender}
                                        onChange={e => setGender(e.target.value)}
                                        label="Gender"
                                        inputProps={{
                                            name: 'gender',
                                            id: 'select-gender',
                                        }}
                                    >
                                        <option value="FEMALE">Female</option>
                                        <option value="MALE">Male</option>
                                        <option value="OTHER">Other</option>
                                    </Select>
                                </FormControl>
                            </Grid>






                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    value={age}
                                    onInput={e => setAge(e.target.value)}
                                    required
                                    fullWidth
                                    name="age"
                                    label="age"
                                    type="number"
                                    id="age"
                                />
                            </Grid>



                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    value={email}
                                    onInput={e => setEmail(e.target.value)}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    value={phoneNumber}
                                    onInput={e => setPhoneNumber(e.target.value)}
                                    required
                                    fullWidth
                                    name="mobile"
                                    label="Mobile No."
                                    type="number"
                                    id="mobile"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    value={address}
                                    onInput={e => setAddress(e.target.value)}
                                    required
                                    fullWidth
                                    name="address"
                                    label="Address"
                                    type="text"
                                    id="address"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    value={pinCode}
                                    onInput={e => setPinCode(e.target.value)}
                                    required
                                    fullWidth
                                    name="pinCode"
                                    label="pinCode"
                                    type="text"
                                    id="pinCode"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Create Test Request
                        </Button>
                    </form>
                </div>

            </Container>
        </React.Fragment>

    )


}

export default RequestTest
