import React from 'react';
import { Image } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen, { LoginNavigationOptions } from './pages/LoginScreen';
import RegisterScreen, { RegisterNavigationOptions } from './pages/RegisterScreen';
import HomeScreen from './pages/HomeScreen';

import logo from './assets/logo-header.png';

const Routes = createAppContainer(
    createStackNavigator({
        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: LoginNavigationOptions,
        },

        RegisterScreen: {
            screen: RegisterScreen,
            navigationOptions: RegisterNavigationOptions,
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