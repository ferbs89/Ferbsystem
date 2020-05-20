import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Logo from './assets/logo.png';

export default function SessionScreen({ navigation }) {
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const user = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('token');

        navigation.navigate((user && token) ? ('HomeScreen') : ('LoginScreen'));
    }

    return (
        <View style={styles.container}>
            <View style={styles.loadingContainer}>
                <View style={styles.imageContainer}>
                    <Image source={Logo} />
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