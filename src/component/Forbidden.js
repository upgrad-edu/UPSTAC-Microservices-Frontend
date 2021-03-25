import {Container, makeStyles, React} from "./index"
import {useGlobalStyles} from "../styles/GlobalStyles";

function Forbidden() {

    const classes = useGlobalStyles();




    return (
        <React.Fragment>
            <Container maxWidth="md" component="main" className={classes.heroContent1}>
                <h1>
                You are UnAuthorized to view this page
                </h1>

            </Container>
        </React.Fragment>

    )
}

export default Forbidden
