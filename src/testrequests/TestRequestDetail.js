import Paper from "@material-ui/core/Paper";
import {makeStyles, React, useHistory} from "../component";
import {useLocation} from "react-router-dom";
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
import { red } from '@material-ui/core/colors';
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
        backgroundColor: red[500],
    },
    w100:{
        width: '100%',
    },
}));


function TestRequestDetail({testRequest}) {


    const classes = useStyles();


    if (! testRequest)
        return <Fragment></Fragment>

    const {name,address,age,email,created,phoneNumber,status,gender,createdBy} =testRequest
    const {userName} =createdBy



    const {initials} = getNameAndInitials(name, "")


    function sendEmail(){
        console.log(email)
        window.location.href = "mailto:" + encodeURIComponent(email);
    }
    function callUser(){


        window.location.href = "tel:" + phoneNumber;
    }


    return (<Card className={classes.root}>
           <CardHeader
               avatar={
                   <Avatar aria-label="recipe" className={classes.avatar}>
                      {initials}
                   </Avatar>
               }
               action={
                   <IconButton aria-label="settings">
                       <MoreVertIcon />
                   </IconButton>
               }
               title={name}
               subheader={"Created on " + new Date(created).toDateString()}
           />
           <CardContent>
               <CardContent>
                   <Typography variant="h5" component="h2">
                       {age} years of age
                   </Typography>

                   <Typography variant="body2" component="p">
                       {address}
                   </Typography>
                   <Typography className={classes.pos} color="textSecondary">
                       {phoneNumber}
                   </Typography>
               </CardContent>

           </CardContent>
           <CardActions disableSpacing>
               <IconButton title={email} aria-label="Send Email" href={"mailto:" + email} >
                   <MailIcon />
               </IconButton>
               <IconButton title={phoneNumber} aria-label="call" href={"tel:" + phoneNumber} >
                   <PhoneIcon />
               </IconButton>

           </CardActions>
           </Card>
    );

}

export default TestRequestDetail;
