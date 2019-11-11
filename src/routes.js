import React from 'react';
import { Image } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import SessionScreen from "./session";
import LoginScreen from './pages/login';
import RegisterScreen from './pages/register';
import HomeScreen from './pages/home';

import logo from './assets/logo.png';

const AuthStack = createStackNavigator({
    LoginScreen,
    RegisterScreen,
}, {
    defaultNavigationOptions: {
        header: null,
    }
});

const AppStack = createDrawerNavigator({
    HomeScreen: {
        screen: createStackNavigator({
            HomeScreen
        }, {
            headerLayoutPreset: 'center',
            defaultNavigationOptions: {
                headerTitle: <Image source={logo} />,
                headerTintColor: '#17496E'
            }
        }),
        navigationOptions: {
            drawerLabel: "Home",
        }
    },
}, {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
        headerTitle: <Image source={logo} />,
        headerTintColor: '#17496E'
    }
});

// const AppStack = createStackNavigator({
//     HomeScreen,
// }, {
//     headerLayoutPreset: 'center',
//     defaultNavigationOptions: {
//         headerTitle: <Image source={logo} />,
//         headerTintColor: '#17496E'
//     }
// });

const Routes = createAppContainer(
    createSwitchNavigator(
        {
            Session: SessionScreen,
            Auth: AuthStack,
            App: AppStack,
        },
        {
            initialRouteName: 'Session',
        }
    )
);

export default Routes;