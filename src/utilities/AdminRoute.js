import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import PageNotFoundNotAllow from '../PageNotFoundNotAllow';
import LoadingSpinner from './LoadingSpinner';
import LocalStorageService from '../LocalStorageService';

class AdminRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false,
            loadUserData: false
        };
    }

    componentDidMount() {
        this.fetchUserData();
    }

    fetchUserData = () => {

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.getAccessToken();

        axios.get(process.env.REACT_APP_BACKEND_URL + "/users/" + LocalStorageService.getUserID())
            .then((res) => {

                if (res.status === 200) {
                    this.setState({
                        isAdmin: res.data.isAdmin
                    });
                }

            }).catch((error) => {
                //console.error(error);

            }).finally(() => {
                this.setState({
                    loadUserData: true
                });
            });
    }

    render() {

        if (!this.state.loadUserData) {
            return (
                <LoadingSpinner />
            );
        }

        if (this.state.isAdmin) {

            return <Route {...this.props} />
        }

        return (
            <Route {...this.props} component={() => <PageNotFoundNotAllow mode='not-allow' />} />
        );
    }
}

export default AdminRoute;