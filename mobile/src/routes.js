import React from 'react';
import { Image } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Drawer from './components/Drawer';
import DrawerButton from './components/DrawerButton';
import Logo from './assets/logo.png';

import SessionScreen from './session';
import LoginScreen from './pages/login';
import LogoutScreen from './pages/logout';
import RegisterScreen from './pages/register';

import WishlistScreen from './pages/wishlist';
import UserScreen from './pages/users';

const HeaderConfig = {
	headerLayoutPreset: 'center',
	defaultNavigationOptions: {
		headerTitle: <Image source={Logo} style={{ marginTop: 10 }} />,
		headerTintColor: '#17496E'
	},
};

const AuthStack = createStackNavigator({
	LoginScreen,
	RegisterScreen,
}, {
	defaultNavigationOptions: {
		header: null,
	}
});

const WishlistStack = createStackNavigator({
	WishlistScreen: {
		screen: WishlistScreen,
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

const AppStack = createDrawerNavigator({
	WishlistStack: {
		screen: WishlistStack,
		navigationOptions: {
			drawerLabel: 'Lista de desejos',
			drawerIcon: ({ tintColor }) => (<Icon name="favorite-border" size={26} color={tintColor} />)
		}
	},

	UserStack: {
		screen: UserStack,
		navigationOptions: {
			drawerLabel: 'Usuários',
			drawerIcon: ({ tintColor }) => (<Icon name="person-outline" size={26} color={tintColor} />)
		}
	},

	LogoutScreen: {
		screen: LogoutScreen,
		navigationOptions: {
			drawerLabel: 'Sair',
			drawerIcon: ({ tintColor }) => (<Icon name="exit-to-app" size={26} color={tintColor} />)
		}
	},
}, {
	contentComponent: Drawer,
	contentOptions: {
		activeTintColor: "#FFFFFF",
		activeBackgroundColor: "#17496E",
		inactiveTintColor: "#41414d",
	},
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