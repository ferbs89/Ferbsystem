import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/node-api';
import logo from '../assets/logo.png';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('ferbs89@gmail.com');
    const [password, setPassword] = useState('fer');
    const [loading, setLoading] = useState(false);

    async function login() {
        if (!email || !password) {
            Alert.alert(null, 'Preencha corretamente os campos de e-mail e senha.');
            return;
        }

        setLoading(true);

        await api.post('/login', {
            email,
            password

        }).then(response => {
            const { user, token } = response.data;

            AsyncStorage.setItem('user', JSON.stringify(user));
            AsyncStorage.setItem('token', token);

            navigation.navigate('HomeScreen');

        }).catch(error => {
            setLoading(false);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <View style={styles.imageContainer}>
                    <Image source={logo} />
                </View>

                {
                    loading ?
                        <ActivityIndicator color="#17496E" size="large" style={{ padding: 10 }} />
                        :
                        <>
                            <TextInput
                                style={styles.textInput}
                                autoCapitalize="none"
                                underlineColorAndroid="rgba(0, 0, 0, 0)"
                                placeholder="E-mail"
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                            />

                            <TextInput
                                style={styles.textInput}
                                autoCapitalize="none"
                                underlineColorAndroid="rgba(0, 0, 0, 0)"
                                placeholder="Senha"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={setPassword}
                            />

                            <TouchableOpacity style={styles.loginButton} onPress={login}>
                                <Text style={styles.loginButtonText}>Entrar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.createButton} onPress={() => { navigation.navigate('RegisterScreen') }}>
                                <Text style={styles.createText}>Criar uma conta</Text>
                            </TouchableOpacity>
                        </>
                }
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

    loginContainer: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 10,
    },

    imageContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textInput: {
        alignSelf: 'stretch',
        paddingVertical: 0,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#DDD',
        height: 40,
        borderRadius: 3,
        marginBottom: 10,
    },

    loginButton: {
        height: 42,
        borderRadius: 5,
        backgroundColor: '#17496E',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    loginButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },

    createButton: {
        height: 42,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#17496E',
        justifyContent: 'center',
        alignItems: 'center',
    },

    createText: {
        color: '#17496E',
        fontWeight: 'bold',
    }
});