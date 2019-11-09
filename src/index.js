import React from 'react';
import { StatusBar } from 'react-native';

import NavigationService from "./config/NavigationService";

import Routes from './routes';

export default function App() {
    return (
        <>
            <StatusBar backgroundColor="#17496E" barStyle="light-content" />
            <Routes ref={(navigatorRef) => NavigationService.setTopLevelNavigator(navigatorRef)} />
        </>
    );
}