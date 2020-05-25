import React from 'react';
import { BrowserRouter, Switch  } from 'react-router-dom';

import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';

import Login from './pages/Login';
import Register from './pages/Register';

import Wishlist from './pages/Wishlist';
import WishlistNew from './pages/WishlistNew';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <PublicRoute path="/" exact component={Login} />
                <PublicRoute path="/register" component={Register} />

                <PrivateRoute path="/wishlist" exact component={Wishlist} />
                <PrivateRoute path="/wishlist/new" component={WishlistNew} />
            </Switch>
        </BrowserRouter>
    );
}