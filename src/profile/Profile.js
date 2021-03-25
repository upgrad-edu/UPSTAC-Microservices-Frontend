import {
    Container,
    Grid,
    makeStyles,
    Paper,
    React,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    useSelector,
} from "../component"

const useStyles = makeStyles((theme) => ({

    heroContent: {
        padding: theme.spacing(3, 0, 2),
    },

}));

function Profile() {

    const classes = useStyles();

    const {user} = useSelector(state => state.auth);

    const profileData = [
        {
            label: "First Name",
            value: user.firstName
        },
        {
            label: "Email",
            value: user.email
        },
        {
            label: "Role",
            value: user.role
        }
    ]

    return (
        <React.Fragment>
            <Container maxWidth="md" component="main" className={classes.heroContent}>
                <h1>
                    Hi {user.userRole === "doctor" ? "Dr." : null} {user.firstName}, your  Profile Details
            </h1>
                <hr />
            </Container>
            <Container maxWidth="md">
                <Grid justify="center"
                    container>
                    <Grid md={8} item>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">

                                <TableBody>
                                    {profileData.map((row,index) => (
                                        <TableRow key={index}>

                                            <TableCell align="left">
                                                <strong>{row.label}</strong>
                                            </TableCell>

                                            <TableCell align="left">{row.value}</TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>
                </Grid>
            </Container>

        </React.Fragment>
    )
}

export default Profile
