import {Redirect, Route} from "react-router-dom";
import React from "react";


const GuardedRoute = ({ component: Component, auth, ...rest }) => {
    return(
        <Route {...rest} render={(props) => (
            auth === true
                ? <Component {...props} />
                : <Redirect to='/forbidden' />
        )} />
    )
}

export default GuardedRoute;
