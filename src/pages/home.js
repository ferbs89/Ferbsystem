import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';

import api from '../services/node-api';
import { Logout } from '../helpers/logout'

export default function HomeScreen({ navigation }) {
    async function listUsers() {
        await api.get("/users").then(response => {
            const { users } = response.data;
            Alert.alert(null, 'OK');

        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Home</Text>
            </View>

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
        padding: 10,
    },

    titleContainer: {
        marginBottom: 10,
    },

    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#17496E',
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