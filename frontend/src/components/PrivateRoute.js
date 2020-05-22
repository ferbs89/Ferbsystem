import React from 'react';
import { Route, Redirect  } from 'react-router-dom';

import { isAuth } from '../services/auth';

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => {
                return isAuth() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                );
            }}
        />
    );
}