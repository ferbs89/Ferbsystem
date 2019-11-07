import React from 'react';
import { Image } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import HomeScreen from './pages/HomeScreen';

import logo from './assets/logo-header.png';

const Routes = createAppContainer(
    createStackNavigator({
        LoginScreen,
        RegisterScreen,
        HomeScreen,
    }, {
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            headerTitle: <Image source={logo} />,
        }
    })
);

export default Routes;