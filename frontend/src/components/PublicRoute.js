import React from 'react';
import { Route, Redirect  } from 'react-router-dom';

import { getSession } from '../services/auth';

export default function PublicRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => (
                !getSession() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/finances", state: { from: props.location } }} />
                )
            )}
        />
    );
}