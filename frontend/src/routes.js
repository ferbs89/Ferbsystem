import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';

import Login from './pages/Login';
import Register from './pages/Register';

import Finances from './pages/Finances';

import Wishlist from './pages/Wishlist';
import WishlistForm from './pages/Wishlist/form';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <PublicRoute path="/" exact component={Login} />
                <PublicRoute path="/register" component={Register} />

                <PrivateRoute path="/finances" exact component={Finances} />

                <PrivateRoute path="/wishlist" exact component={Wishlist} />
                <PrivateRoute path="/wishlist/new" component={WishlistForm} />
                <PrivateRoute path="/wishlist/:id" component={WishlistForm} />
            </Switch>
        </BrowserRouter>
    );
}