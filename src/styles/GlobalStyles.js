import {makeStyles} from "../component";

export const useGlobalStyles = makeStyles((theme) => ({

    '@global': {
        body: {
            backgroundColor: '#e6e6e6'
        },
        footer:{
            marginTop:'calc(5% + 60px)',
            bottom: 0
        }
    },
    footer:{
        marginTop:'calc(5% + 60px)',
        bottom: 0
    },
    heroContent: {
        padding: theme.spacing(2, 0, 2),
    },
    heroContent1: {
        padding: theme.spacing(1, 0,1),
    },
    heroContent3: {
        padding: theme.spacing(3, 0, 6),
    },
    paperWhite: {
        margin: "0 auto",
        padding: "20px 20px 20px 20px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor:'white',
    },
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    mt40:{
        marginTop:40,
    },
    w100:{
        width: '100%',
    },
    marginOneSpace: {
        margin: theme.spacing(1),
    },
    formContainer:{
        padding:"50 50 50 50"
    },
    formFullWidth: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    formFullWidthOneSpace: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submitWithSmallMargin: {
        margin: theme.spacing(3, 0, 2)

    },
}));
