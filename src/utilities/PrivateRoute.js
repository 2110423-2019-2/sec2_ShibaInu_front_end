import React from "react";
import { Route, Redirect } from "react-router-dom";
import LocalStorageService from "../LocalStorageService";

function PrivateRoute({ component: Component, ...rest }) {

    return (
        <Route
            {...rest}
            render={props =>
                LocalStorageService.getAccessToken() ? (
                    <Component {...props} />
                ) : (
                        <Redirect to="/signin" />
                    )
            }
        />
    );
}

export default PrivateRoute;