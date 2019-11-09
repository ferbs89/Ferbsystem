import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/node-api';
import { Logout } from './logout'

export default function HomeScreen({ navigation }) {
    async function listUsers() {
        await api.get("/users").then(response => {
            const { users } = response.data;
            Alert.alert(null, 'OK');

        }).catch(error => {

        });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={listUsers}>
                <Text style={styles.buttonText}>Testar API</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={Logout}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },

    button: {
        height: 42,
        borderRadius: 5,
        backgroundColor: '#17496E',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});