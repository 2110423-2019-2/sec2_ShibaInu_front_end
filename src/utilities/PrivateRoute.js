import React from "react";
import { Route, Redirect } from "react-router-dom";
import axios from 'axios';
import LocalStorageService from "../LocalStorageService";
var utilities = require('../Utilities.json');

function PrivateRoute({ component: Component, ...rest }) {

    return (
        <Route
            {...rest}
            render={props =>
                auth() ? (
                    <Component {...props} />
                ) : (
                        <Redirect to="/signin" />
                    )
            }
        />
    );
}

function auth() {
    let returnBool = false;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();
    axios.get(utilities['backend-url'] + "/users/fromtoken")
        .then(res => {
            returnBool = true;
        }).catch((error) => {

            if (error.response.status === 401) {
                console.log('Unauthorization');
                returnBool = false;

            } else {
                console.error(error);
                returnBool = false;
            }
        });

    console.log(returnBool);
    return returnBool;
}

export default PrivateRoute;