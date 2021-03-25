import {
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    makeStyles,
    TextField,
    Typography
} from "../component"
import {useHistory} from "react-router-dom";

import React, {useState} from 'react';
import {useDispatch} from 'react-redux';


import {environment} from "../environment";
import {clearAuthToken, doLogin} from "./authDispatcher";
import {LOGIN} from "./authStore";
import {appNotification} from "../shared/notification/app-notification";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Login(props) {

    const classes = useStyles();
    const history = useHistory();

    const dispatch = useDispatch()


    const [userName, set_userName] = useState("")
    const [password, set_password] = useState("")







    async function login(event) {
        event.preventDefault();
        console.log("userName",userName)
        const payload = {
            userName,
            password
        }


        const loginUrl = environment.baseUrl +"/auth/login"


        doLogin( payload)
            .subscribe( (response) =>{

                const currentUser = response.user
                const token = response.token


                dispatch({type: LOGIN,"payload":response});



                    history.push("/profile")


            },(error => {
                appNotification.showError(error )


            }))
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Login in
          </Typography>
                <form className={classes.form} onSubmit={login} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        label="User Name"
                        name="userName"
                        autoComplete="userName"
                        autoFocus
                        value={userName}
                        onInput={e => {
                            set_userName(e.target.value)
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onInput={e => set_password(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Sign In
            </Button>
                    <Grid container>
                        <Grid item xs>
                            {/* <Link href="#" variant="body2">
                                Forgot password?
                                /upload-document/210
                </Link> */}
                        </Grid>
                        <Grid item>
                            <Link href="#" to="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>

    )
}


export default Login
