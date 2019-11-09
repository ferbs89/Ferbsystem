import React from 'react';
import { Image } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './pages/login';
import RegisterScreen from './pages/register';
import HomeScreen from './pages/home';

import logo from './assets/logo.png';

const Routes = createAppContainer(
    createStackNavigator({
        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: {
                header: null
            },
        },

        RegisterScreen: {
            screen: RegisterScreen,
            navigationOptions: {
                header: null
            },
        },

        HomeScreen,
    }, {
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            headerTitle: <Image source={logo} />,
            headerTintColor: '#17496E'
        }
    })
);

export default Routes;