import React from 'react';
import { StyleSheet, View, Image, TextInput, Text, TouchableOpacity } from 'react-native';

import Logo from '../assets/logo.png';

export default function RegisterScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <View style={styles.imageContainer}>
                    <Image source={Logo} />
                </View>

                <TextInput
                    style={styles.textInput}
                    underlineColorAndroid="rgba(0, 0, 0, 0)"
                    placeholder="Nome"
                />

                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    underlineColorAndroid="rgba(0, 0, 0, 0)"
                    placeholder="E-mail"
                    keyboardType="email-address"
                />

                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    underlineColorAndroid="rgba(0, 0, 0, 0)"
                    placeholder="Senha"
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.createButton} onPress={() => { navigation.navigate('LoginScreen') }}>
                    <Text style={styles.createText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
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