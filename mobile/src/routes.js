import React from 'react';
import { Image } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import DrawerButton from './components/DrawerButton';
import Logo from './assets/logo.png';

import SessionScreen from "./session";
import LoginScreen from './pages/login';
import RegisterScreen from './pages/register';

import HomeScreen from './pages/home';
import UserScreen from './pages/users';
import FavoriteScreen from './pages/favorites';

const HeaderConfig = {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
        headerTitle: <Image source={Logo} />,
        headerTintColor: '#17496E'
    }
};

const AuthStack = createStackNavigator({
    LoginScreen,
    RegisterScreen,
}, {
    defaultNavigationOptions: {
        header: null,
    }
});

const HomeStack = createStackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <DrawerButton navigation={navigation} />,
        })
    },
}, HeaderConfig);

const UserStack = createStackNavigator({
    UserScreen: {
        screen: UserScreen,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <DrawerButton navigation={navigation} />,
        })
    },
}, HeaderConfig);

const FavoriteStack = createStackNavigator({
    FavoriteScreen: {
        screen: FavoriteScreen,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <DrawerButton navigation={navigation} />,
        })
    },
}, HeaderConfig);

const AppStack = createDrawerNavigator({
    HomeStack: {
        screen: HomeStack,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (<Icon name="home" size={26} color={tintColor} />)
        }
    },

    UserStack: {
        screen: UserStack,
        navigationOptions: {
            drawerLabel: 'Usuários',
            drawerIcon: ({ tintColor }) => (<Icon name="person" size={26} color={tintColor} />)
        }
    },

    FavoriteStack: {
        screen: FavoriteStack,
        navigationOptions: {
            drawerLabel: 'Favoritos',
            drawerIcon: ({ tintColor }) => (<Icon name="favorite" size={26} color={tintColor} />)
        }
    },
}, {
    contentOptions: {
        activeTintColor: "#FFFFFF",
        activeBackgroundColor: "#17496E",
        inactiveTintColor: "#17496E",
    }
});

const Routes = createAppContainer(
    createSwitchNavigator({
        Session: SessionScreen,
        Auth: AuthStack,
        App: AppStack,
    }, {
        initialRouteName: 'Session',
    })
);

export default Routes;