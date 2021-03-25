import Paper from "@material-ui/core/Paper";
import {makeStyles, React, useHistory, useState} from "../component";
import {useLocation} from "react-router-dom";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Fragment} from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import CardActions from "@material-ui/core/CardActions";
import {blue} from '@material-ui/core/colors';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import WifiIcon from '@material-ui/icons/Wifi';
import BluetoothIcon from '@material-ui/icons/Bluetooth';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {getNameAndInitials} from "../shared/common-helpers";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },

    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    avatar: {
        backgroundColor: blue[500],
    },
    w100: {
        width: '100%',
    },
    listroot: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    listLabel: {
        fontWeight: "bold"
    },
    listValue: {
        fontWeight: "normal"
    }
}));


function LabResultDetail({labResult}) {


    const classes = useStyles();

    if (!labResult)
        return <Fragment></Fragment>

    const {bloodPressure, comments, heartBeat, oxygenLevel, result, temperature, tester, updatedOn} = labResult
    const {firstName, lastName, email, phoneNumber} = tester



const {initials,name} = getNameAndInitials(firstName, lastName)


    return (<Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {initials}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={"Test Results"}
                subheader={"Updated on " + new Date(updatedOn).toDateString() + " by " + name}
            />
            <CardContent>
                <CardContent>


                    <small>
                        Blood Pressure : {bloodPressure}
                        <Divider></Divider>
                        Heart Beat : {heartBeat}
                        <Divider></Divider>
                        Oxygen Level : {oxygenLevel}
                        <Divider></Divider>
                        Temperature : {temperature}
                        <Divider></Divider>
                        Test Result : {result}
                    </small>


                </CardContent>

            </CardContent>
            <CardActions disableSpacing>
                <IconButton title={email} aria-label="Send Email" href={"mailto:" + email}>
                    <MailIcon/>
                </IconButton>
                <IconButton title={phoneNumber} aria-label="call" href={"tel:" + phoneNumber}>
                    <PhoneIcon/>
                </IconButton>

            </CardActions>
        </Card>
    );

}

export default LabResultDetail;
