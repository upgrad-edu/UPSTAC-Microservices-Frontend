import {Button, Container, Grid, React, TextField, useEffect, useState} from "../component"

import {appNotification} from "../shared/notification/app-notification";
import {doGetThresholds, doUpdateAllThresholds} from "./shared/authorityDispatcher";
import {useGlobalStyles} from "../styles/GlobalStyles";
import {errorHandler} from "../shared/common-helpers";

function UpdateThreshold() {

    const classes = useGlobalStyles();

    const [thresholds, setThresholds] = useState([]);

    function updateThreshold(thresholdType,maxLimit){

        const updatedThresholds = thresholds.map(threshold=>{

            if(threshold.thresholdType === thresholdType)
                return {thresholdType,maxLimit}
            else
                return threshold;
        })
        setThresholds(updatedThresholds)

    }

    function handleSubmit(event) {




        event.preventDefault();


        doUpdateAllThresholds(thresholds)
            .subscribe((response) => {
                appNotification.showSuccess("Succesfully Updated Thresholds")


            },  errorHandler)

    }

    function getAllThresholds(){
        doGetThresholds()
            .subscribe((result) => {

                   setThresholds(result)


            }, errorHandler)
    }



    useEffect(() => {



        getAllThresholds();




    }, [])




    return (
        <React.Fragment>

            <Container maxWidth="md" component="main" className={classes.heroContent}>
                <h1>
                    Update Thresholds
                </h1>
                <hr />
            </Container>
            <Container maxWidth="md">
                <Grid justify="center"
                      container>
                    <Grid md={8} item>
                        <form className={classes.formFullWidth} onSubmit={handleSubmit} noValidate>

                            <Grid container spacing={2}>





                                {thresholds.map((threshold) => (


                                    <Grid item xs={12} key={threshold.thresholdType}>

                                        <TextField

                                            name={threshold.thresholdType}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id={threshold.thresholdType}
                                            label={threshold.thresholdType}
                                            value={threshold.maxLimit}
                                            onInput={e => updateThreshold(threshold.thresholdType,e.target.value)}

                                        />
                                    </Grid>


                                ))}







                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submitWithSmallMargin}
                            >
                                Save Thresholds
                            </Button>

                        </form>

                    </Grid>
                </Grid>
            </Container>


        </React.Fragment>

    )
}

export default UpdateThreshold
