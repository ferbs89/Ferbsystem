import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function HomeScreen() {
    const [user, setUser] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => setUser(JSON.parse(user)));
        AsyncStorage.getItem('token').then(setToken);
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Usuário: {user.id}</Text>
            <Text>E-mail: {user.email}</Text>
        </View>
    );
}