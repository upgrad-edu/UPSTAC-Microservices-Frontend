import React, {Component, Fragment} from 'react';
import {appNotification} from "./app-notification";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from "@material-ui/core/Snackbar";

const TEN_SECONDS =  10  * 1000


class AppNotificationComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            "show": false,
            "title": '',
            "variant": '',
            "message": '',
        };
    }

    componentDidMount() {

        this.subscription = appNotification.onChange().subscribe(res => {
            this.onNotificationReceived(res);
        })
    }

    onNotificationReceived(res) {


        console.log("showing")

            this.setState({
                "show": true,
                "title": res.title,
                "variant": res.variant,
                "message": res.message
            });
            this.resetAfterTenSeconds()

    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    reset() {

        this.setState({
            "show": false,
            "title": '',
            "variant": '',
            "message": '',
        });
    }

    resetAfterTenSeconds() {
        setTimeout(() => {
            this.reset();
        }, TEN_SECONDS)
    }

    render() {

        const {show, title, message, variant} = this.state

        if(!show)
            return <Fragment></Fragment>

        return <Fragment>
            <Snackbar open={show} autoHideDuration={26000} onClose={() => {
                this.reset()
            }}>
                <Alert onClose={() => {
                    this.reset()
                }} severity={variant}  action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            this.reset()
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                >
                    <AlertTitle>{title}</AlertTitle>
                    {message}

                </Alert>
            </Snackbar>
        </Fragment>

    }
}


export default AppNotificationComponent;
