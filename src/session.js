import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import logo from './assets/logo.png';

export default function SessionScreen({ navigation }) {
    const [user, setUser] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        fetchData();

        if (user && token)
            navigation.navigate('HomeScreen');
        else
            navigation.navigate('LoginScreen');
    }, []);

    async function fetchData() {
        await AsyncStorage.getItem('user').then(user => setUser(JSON.parse(user)));
        await AsyncStorage.getItem('token').then(setToken);
    }

    return (
        <View style={styles.container}>
            <View style={styles.loadingContainer}>
                <View style={styles.imageContainer}>
                    <Image source={logo} />
                </View>

                <ActivityIndicator color="#17496E" size="large" />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#17496E',
        padding: 10,
    },

    loadingContainer: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 10,
    },

    imageContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});