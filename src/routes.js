import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SessionScreen from "./session";
import LoginScreen from './pages/login';
import RegisterScreen from './pages/register';

import HomeScreen from './pages/home';
import FavoriteScreen from './pages/favorites';

import logo from './assets/logo.png';

const Header = {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
        headerTitle: <Image source={logo} />,
        headerTintColor: '#17496E'
    }
};

const DrawerButton = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ padding: 10 }}>
            <Icon name="menu" size={30} color="#17496E" />
        </TouchableOpacity>
    );
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
}, Header);

const FavoriteStack = createStackNavigator({
    FavoriteScreen: {
        screen: FavoriteScreen,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <DrawerButton navigation={navigation} />,
        })
    },
}, Header);

const AppStack = createDrawerNavigator({
    HomeStack: {
        screen: HomeStack,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (<Icon name="home" size={26} color={tintColor} />)
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