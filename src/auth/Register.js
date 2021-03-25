import {
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Link,
    makeStyles,
    MuiAlert,
    Radio,
    RadioGroup,
    React,
    Snackbar,
    TextField,
    Typography,
    useHistory,
    useState
} from "../component"
import {appNotification} from "../shared/notification/app-notification";
import {doRegisterDoctor, doRegisterTester, doRegisterUser} from "./authDispatcher";
import {LOGIN} from "./authStore";
import {useDispatch} from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {getAsFormatted} from "../shared/date-helpers";



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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


function Register() {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [error_message, set_error_message] = React.useState(false);


    const [userName, setUserName] = useState('user');
    const [firstName, setFirstName] = useState('user');
    const [lastName, setLastName] = useState('uslast');
    const [email, setEmail] = useState('user@upgrad.com');
    const [dateOfBirth, setDateOfBirth] = useState('1981-11-21');
    const [password, setPassword] = useState('password');
    const [confirmPassword, setConfirmPassword] = useState('password');
    const [address, setAddress] = useState('some address ,some day');

    const [pinCode, setPinCode] = useState('45787878');
    const [role, setRole] = useState("USER");
    const [phoneNumber,setPhoneNumber] = useState("45454545");
    const [gender, setGender] = useState("MALE");
    const [isAgreed, setIsAgreed] = useState(false);

    //
    // const [userName, setUserName] = useState('');
    // const [firstName, setFirstName] = useState('');
    //const [confirmPassword, setConfirmPassword] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [address, setAddress] = useState('');
    //
    // const [pinCode, setPinCode] = useState('');
    // const [userRole, setRole] = useState("");
    // const [phoneNumber,setPhoneNumber] = useState("");
    // const [gender, setGender] = useState("MALE");



    function getRoles (input){

        const isUser = (input === "USER")
        const isDoctor = (input === "DOCTOR")
        const isTester = (input === "TESTER")


        return {isUser,isDoctor,isTester}
    }

    function callObservable(subscriberMethod,callback) {

        subscriberMethod
            .subscribe((response) => {

                callback(response)

            }, (error => {


                appNotification.showError(error)
            }))

    }
    function registerUser(payload) {


        callObservable(doRegisterUser(payload),(response)=>{

            const currentUser = response.user
            const token = response.token

            appNotification.showSuccess("Succesfully Registered")
            dispatch({type: LOGIN, "payload": response});
            history.push("/profile")

        })

    }
    function registerDoctor(payload) {

        callObservable(doRegisterDoctor(payload),(response)=>{
            appNotification.showSuccess("Succesfully Registered,Please upload Document to continue")

            history.push("/upload-document/" + role +"/" + response.id)

        })



    }
    function registerTester(payload) {

        callObservable(doRegisterTester(payload),(response)=>{



            appNotification.showSuccess("Succesfully Registered,Please upload Document to continue")

            history.push("/upload-document/" + role +"/" + response.id)

        })

    }

    function onUserTypeChanged(evt,role){
        if(evt.target.checked)
            setRole(role)

    }
    function handleSubmit(event) {
        event.preventDefault();





        const payload = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            dateOfBirth:getAsFormatted(new Date(dateOfBirth)),
            address,
            pinCode,
            userName,
            phoneNumber,
            gender
        }



        if(!isAgreed ){

            appNotification.showError("Please agree the terms and conditions")
            return;
        }
        if(confirmPassword !== password){

            appNotification.showError("Passwords Mismatch")
            return;
        }
        let  {isUser,isDoctor,isTester} = getRoles(role)


        if(isUser)
            registerUser(payload);
        else if(isDoctor)
            registerDoctor(payload);
        else if(isTester)
            registerTester(payload);


    }

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">

                <div className={classes.paper}>

                    <Typography component="h1" variant="h5">
                        Register to take Laboratory Tests.
                        <hr />
                    </Typography>


                    <form className={classes.form} onSubmit={handleSubmit} noValidate>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Select Role to Register</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-label="userRole"
                                        name="userRole"
                                        id="userroleDetail"
                                        value={role}
                                        >


                                        <FormControlLabel value="USER" control={<Radio  onChange={e => onUserTypeChanged(e,"USER")}  />} label="Patient" />
                                        <FormControlLabel value="TESTER" control={<Radio onChange={e => onUserTypeChanged(e,"TESTER")} />} label="Tester" />
                                        <FormControlLabel value="DOCTOR" control={<Radio onChange={e => onUserTypeChanged(e,"DOCTOR")} />} label="Doctor" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="firstName"
                                    value={firstName}
                                    onInput={e => setFirstName(e.target.value)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    variant="outlined"
                                    value={lastName}
                                    onInput={e => setLastName(e.target.value)}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>


                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel htmlFor="outlined-gender-native-simple">Gender</InputLabel>
                                    <Select
                                        native
                                        value={gender}
                                        onChange={e => {

                                            setGender(e.target.value)
                                        }}
                                        label="Gender"
                                        inputProps={{
                                            name: 'gender',
                                            id: 'outlined-gender-native-simple',
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
                                    value={dateOfBirth}
                                    onInput={e => setDateOfBirth(e.target.value)}
                                    required
                                    fullWidth
                                    id="dateOfBirth"
                                    label="Date of Birth"
                                    name="dateOfBirth"
                                    type="date"
                                    autoComplete="dateOfBirth"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    value={userName}
                                    onInput={e => setUserName(e.target.value)}
                                    required
                                    fullWidth
                                    id="userName"
                                    label="User Name"
                                    name="userName"
                                    autoComplete="userName"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    value={password}
                                    onInput={e => setPassword(e.target.value)}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    value={confirmPassword}
                                    onInput={e => setConfirmPassword(e.target.value)}
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
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
                                    label="Pincode"
                                    type="text"
                                    id="pinCode"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    id="agreecondition"
                                    control={<Checkbox checked={isAgreed} onChange={e => {
                                        setIsAgreed(e.target.checked)
                                    }} value="allowExtraEmails" color="primary" />}
                                    label="I agree to abide by all government regulation."
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
                            Register
          </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
              </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>

            </Container>
        </React.Fragment>

    )
}

export default Register
