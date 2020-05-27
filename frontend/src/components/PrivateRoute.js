import React from 'react';
import { Route, Redirect  } from 'react-router-dom';

import { getSession } from '../services/auth';

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => (
                getSession() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
            )}
        />
    );
}