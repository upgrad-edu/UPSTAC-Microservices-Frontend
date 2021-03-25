import {CssBaseline, makeStyles, React, Route, Router, Switch, UINavBar,} from "./component"



import './App.css';
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {setAuthToken} from "./auth/authDispatcher";
import GuardedRoute from "./shared/GuardedRoute";
import UpdateLabResult from "./lab/UpdateLabResult";
import PendingConsultations from "./consultation/PendingConsultations";
import UpdateConsultation from "./consultation/UpdateConsultation";
import UserHistory from "./testrequests/UserHistory";

import UpdateThreshold from "./authority/UpdateThreshold";
import ViewAllRequests from "./authority/ViewAllRequests";
import AppNotificationComponent from "./shared/notification/app-notification-component";
import Register from "./auth/Register";
import {UploadDocument} from "./documents/UploadDocument";
import PendingApprovals from "./authority/PendingApprovals";
import LoadingIndicatorComponent from "./shared/loader/loading-indicator-component";
import ConfirmMessageComponent from "./shared/confirm/confirm-message-component";
import PendingLabTests from "./lab/PendingLabTests";
import LabHistory from "./lab/LabHistory";
import ConsultationHistory from "./consultation/ConsultationHistory";
import Profile from "./profile/Profile";
import RequestTest from "./testrequests/RequestTest";
import Login from "./auth/Login";
import AuthorityDashboard from "./authority/AuthorityDashboard";
import {Redirect} from "react-router-dom";

const useStyles = makeStyles((theme) => ({

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
  }


}));


function App() {
  const classes = useStyles();
  const {user,token,isLoggedIn,roles} = useSelector(state => state.auth);

  const auth = {user,token,isLoggedIn,roles}

  let  {isUser,isDoctor,isAuthority,isTester,isApproved} = roles



  let homePage = '/login'

  if(isLoggedIn)
    homePage ='/profile'

  useEffect(() => {


    if(token && user){
      setAuthToken(token)

    }

  }, [token]);

  return (<React.Fragment>

        <LoadingIndicatorComponent></LoadingIndicatorComponent>
        <UINavBar />
        <ConfirmMessageComponent/>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/upload-document/:role/:id">
            <UploadDocument />
          </Route>
          <GuardedRoute path='/profile' component={Profile} auth={isLoggedIn} />
          <GuardedRoute path='/request-test' component={RequestTest} auth={isUser} />

          <GuardedRoute path='/user-history' component={UserHistory} auth={isUser} />

          {/*<GuardedRoute path='/test-detail/:id' component={TestDetail} auth={isLoggedIn} />*/}
          <GuardedRoute path='/lab-history' component={LabHistory} auth={isTester} />

          <GuardedRoute path='/pending-lab-tests' component={PendingLabTests} auth={isTester} />
          <GuardedRoute path='/update-lab-report/:id' component={UpdateLabResult} auth={isTester} />


          <GuardedRoute path='/consultation-history' component={ConsultationHistory} auth={isDoctor} />
          <GuardedRoute path='/pending-consultations' component={PendingConsultations} auth={isDoctor} />
          <GuardedRoute path='/update-consultation/:id' component={UpdateConsultation} auth={isDoctor} />

          <GuardedRoute path='/update-thresholds' component={UpdateThreshold} auth={isAuthority} />
          <GuardedRoute path='/pending-user-approvals' component={PendingApprovals} auth={isAuthority} />
          <GuardedRoute path='/view-all-requests' component={ViewAllRequests} auth={isAuthority} />
          <GuardedRoute path='/dashboard' component={AuthorityDashboard} auth={isAuthority} />


          {/*<Route path="/tests-requested">*/}
          {/*  <TestsRequested />*/}
          {/*</Route>*/}
          {/*<Route path="/test-result">*/}
          {/*  <TestResult />*/}
          {/*</Route>*/}
          {/*<Route path="/take-sample">*/}
          {/*  <TakeSample />*/}
          {/*</Route>*/}

          <Route path="/">
            <Redirect to={homePage} />
          </Route>
        </Switch>
        <AppNotificationComponent/>


    </React.Fragment>

  );
}

export default App;
