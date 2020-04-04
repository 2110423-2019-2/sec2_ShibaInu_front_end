import React from "react";
import { Route, Redirect } from "react-router-dom";
import LocalStorageService from "../LocalStorageService";

function GuestRoute({ component: Component, ...rest }) {

    return (
        <Route
            {...rest}
            render={props =>
                !LocalStorageService.getAccessToken() ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={"/" + (LocalStorageService.getUserMode() ? (LocalStorageService.getUserMode() === 'guest' ? 'client' : LocalStorageService.getUserMode()) : 'client' ) + "/home"} />
                    )
            }
        />
    );
}

export default GuestRoute;