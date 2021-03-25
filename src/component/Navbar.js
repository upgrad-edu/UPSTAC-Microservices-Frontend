import {AppBar, Button, Link, React, Toolbar, Typography, useDispatch, useHistory, useSelector,} from "./index"
import {makeStyles} from '@material-ui/core/styles';
import upgrad_logo from "../upgrad.png"
import {useLocation} from 'react-router-dom';
import {doLogout} from "../auth/authDispatcher";


const useStyles = makeStyles((theme) => ({

    '@global': {
        body: {
            backgroundColor: '#e6e6e6'
        },
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `3px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    activeLink: {
        margin: theme.spacing(1, 1.5),
        backgroundColor: "#3f51b5",
        color: "#ffffff",
        '&:hover': {
            color: "#3f51b5",
            backgroundColor: "#ffffff",
            border:'1px solid #3f51b5'
        },
    },


}));


function Navbar(props) {

    const dispatch = useDispatch()
    const history = useHistory();
const location =useLocation();

    function logout() {

        doLogout(dispatch, history)


    }

    const classes = useStyles();
    const {user, token, isLoggedIn, roles} = useSelector(state => state.auth);

    let {isUser, isDoctor, isAuthority, isTester,isApproved} = roles

    const isNotAuthority = (isLoggedIn == true) && (isAuthority == false);
    const isNotLoggedIn = !isLoggedIn




    const allMenus = [
        {url: "/dashboard", label: "Dashboard", rule: isAuthority},
        {url: "/profile", label: "Profile", rule: isLoggedIn},
         {url: "/request-test", label: "Request Test", rule: isUser},
        {url: "/user-history", label: "Request History", rule: isUser},
        {url: "/lab-history", label: "Request History", rule: isTester},
        {url: "/consultation-history", label: "Request History", rule: isDoctor},
        {url: "/pending-lab-tests", label: "Tests Requested", rule: isTester},
        {url: "/pending-consultations", label: "Consultations Requested", rule: isDoctor},
        {url: "/update-thresholds", label: "Settings", rule: isAuthority},
        {url: "/pending-user-approvals", label: "Approve Users", rule: isAuthority},
        {url: "/view-all-requests", label: "All Requests", rule: isAuthority}
    ];

    const currentPath =location.pathname


    const menusToBeDisplayed = allMenus.filter(value => value.rule).map(item=>{

        const menuClassName = (item.url == currentPath)? classes.activeLink:classes.link;
        return {...item, menuClassName}

    })


    return (
        <React.Fragment>

            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>

                    <img src={upgrad_logo} height="30" alt="Upgrad"/>

                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        &nbsp;

                        <Button component={Link} variant="text" to="/" className={classes.link}>

                            Upgrad Labs
                        </Button>
                    </Typography>


                    <nav>

                        {menusToBeDisplayed.map((item, index) => {
                            return (
                                <Button key={index} component={Link} variant="text" color="primary" to={item.url}
                                        className={item.menuClassName}>
                                    {item.label}
                                </Button>);


                        })}


                    </nav>


                    {(isLoggedIn) ?
                        <Button id="btnlogout" onClick={logout} color="secondary" variant="outlined" className={classes.link}>
                            Logout
                        </Button> : <div>
                            <Button component={Link} to="/login" color="secondary" variant="outlined"
                                    className={classes.link}>
                                Login
                            </Button>
                            <Button component={Link} to="/register" color="primary" variant="outlined"
                                    className={classes.link}>
                                Register for test
                            </Button></div>
                    }
                </Toolbar>
            </AppBar>
        </React.Fragment>

    )
}


export default Navbar
