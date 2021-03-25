import {Container, Grid, React, Typography, useState} from "../component"
import 'chartjs-plugin-datalabels'
import {appNotification} from "../shared/notification/app-notification";
import {doGetAnalytics} from "./shared/authorityDispatcher";
import {Bar, Doughnut} from 'react-chartjs-2';
import {useGlobalStyles} from "../styles/GlobalStyles";
import {
    getAllHomeQuarantineAdmitChartDetails,
    getAllPostiveNegativeChartDetails,
    getPincodeHomeQuarantineAdmissionDistributionChartDetails,
    getPincodePositiveNegativeDistributionChartDetails
} from "./shared/dashboard-charts";
import {useEffect} from "react";


const pieOptions =  {
    tooltips: {
        mode: 'index',
        intersect: false
    },
    responsive: true,
    plugins: {
        datalabels: {
            color: '#ffffff'
        }
    }

};

const pincodeDistributionOptions =  {
    tooltips: {
        mode: 'index',
        intersect: false
    },
    responsive: true,
    plugins: {
        datalabels: {
            display:false,
            color: '#ffffff'
        }
    },
    scales: {
        xAxes: [{
            stacked: true,
            scaleLabel: {
                display: true,
                labelString: 'Pincode'
            }
        }],
        yAxes: [{
            stacked: true,
            scaleLabel: {
                display: true,
                labelString: 'Count'
            }
        }]
    }
}


function AuthorityDashboard() {

    const classes = useGlobalStyles();


     const [allPositiveNegativeChart, setAllPositiveNegativeChart] = useState({});
    const [allHomeQuarantineAdmitChart, setAllHomeQuarantineAdmitChart] = useState({});
    const [pincodePositiveNegativeDistributionChart, setPincodePositiveNegativeDistributionChart] = useState({});
    const [pincodeHomeQuarantineAdmissionDistributionChart, setPincodeHomeQuarantineAdmissionDistributionChart] = useState({});



    useEffect(() => {


        doGetAnalytics()
            .subscribe((result) => {


                setAllPositiveNegativeChart(getAllPostiveNegativeChartDetails(result))
                setAllHomeQuarantineAdmitChart(getAllHomeQuarantineAdmitChartDetails(result))
                setPincodePositiveNegativeDistributionChart(getPincodePositiveNegativeDistributionChartDetails(result))
                setPincodeHomeQuarantineAdmissionDistributionChart(getPincodeHomeQuarantineAdmissionDistributionChartDetails(result))
            }, (error => {


                appNotification.showError(error)
            }))





    }, [])




    return (
        <React.Fragment>
            <Container component="main" className={classes.mt40}>


                <Grid container spacing={2}  className={classes.paperWhite} >

                    <Typography component="h1" variant="h5">
                        Dashboard
                        <hr />
                    </Typography>
                    <Grid container spacing={2}  className={classes.formContainer} >

                        <Grid item xs={6} >
                            <div>
                                <h2>Test Positive/Negative Distribution</h2>
                                <Doughnut data={allPositiveNegativeChart} options={pieOptions} />
                            </div>

                        </Grid>
                        <Grid item xs={6} >

                            <h2>Test Home Quarantine/Admission  Distribution</h2>
                            <Doughnut data={allHomeQuarantineAdmitChart} options={pieOptions} />

                        </Grid>
                    </Grid>
                    <Grid container spacing={2}  className={classes.formContainer} >

                        <Grid item xs={6} >
                            <h2>Test Positive/Negative - Pincode based   Distribution</h2>
                            <Bar data={pincodePositiveNegativeDistributionChart} options={pincodeDistributionOptions} />

                        </Grid>
                        <Grid item xs={6} >

                            <h2> Home Quarantine/Admission - Pincode based   Distribution</h2>
                            <Bar data={pincodeHomeQuarantineAdmissionDistributionChart} options={pincodeDistributionOptions} />


                        </Grid>
                    </Grid>


                </Grid>

            </Container>
        </React.Fragment>

    )
}

export default AuthorityDashboard
