import {
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    makeStyles,
    Typography,
    useHistory
} from "../component"

import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {appNotification} from "../shared/notification/app-notification";
import {doUploadDocument} from "../auth/authDispatcher";
import {useLocation, useRouteMatch} from 'react-router-dom';
import {useGlobalStyles} from "../styles/GlobalStyles";



export function UploadDocument(props) {

    const classes = useGlobalStyles();
    const history = useHistory();

    let {params} = useRouteMatch("/upload-document/:role/:id");

    const {role,id} =params
    const [selectedFiles, setSelectedFiles] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [isAgreed, setIsAgreed] = useState(false);




       const isDoctor = (role === "DOCTOR")
        const isTester = (role === "TESTER")

    let text="Please upload the ID card to continue"

    if(isTester)
     text="Please upload the Lab Tester ID card for account verification"
    else if(isDoctor)
        text="Please upload the Doctor ID card for account verification"


    async function uploadFile(event) {
        event.preventDefault();


        if(!isAgreed ){
            appNotification.showError("Please agree to the terms and conditions")
            return;
        }

    const hasFileData  = (input)=>{
            const files = input || []
            return (files  && files.length >0)
    }


        if(hasFileData(selectedFiles) == false){
            appNotification.showError("Please Select a Document to upload")
            return;
        }
       // let file = files[0];


        setDisabled(true)

        doUploadDocument(id,selectedFiles[0])
            .subscribe( (response) =>{


                appNotification.showSuccess("Succesfully Uploaded Document, You will be notified after its approved" )
                history.push("/")

            },(error => {
                console.log("server error")
                appNotification.showError(error )
                setDisabled(false)
            }))
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    {text}
                </Typography>


                <form className={classes.formFullWidthOneSpace} onSubmit={uploadFile} noValidate>

                    <Grid container spacing={2}>


                        <Grid item xs={12}>
                            <input type="file"   id="fileUpdate"  onChange={e => setSelectedFiles(e.target.files)}/>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                id="documentAgreeCondition"
                                control={<Checkbox checked={isAgreed} onChange={e => setIsAgreed(e.target.checked)} value="allowExtraEmails" color="primary" />}
                                label="I agree that all the information provided is Genuine."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submitWithSmallMargin}
                    >
                        Upload
                    </Button>

                </form>

            </div>

        </Container>

    )
}
