import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';

export default function FavoriteScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Favoritos</Text>
            </View>
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