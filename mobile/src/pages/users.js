import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert, ActivityIndicator, FlatList } from 'react-native';

import api from '../services/node-api';

export default function UsersScreen({ navigation }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        listUsers();
    }, []);

    async function listUsers() {
        setLoading(true);

        await api.get("/users").then(response => {
            const { users } = response.data;
            setUsers(users);

        }).catch(error => {
            console.log(error);
            setUsers([]);
        });

        setLoading(false);
    }

    const renderItem = ({ item }) => (
        <View style={styles.userContainer}>
            <View>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Usuários</Text>
            </View>

            {
                loading ?
                    <ActivityIndicator color="#17496E" size="large" style={{ padding: 10 }} />
                    :
                    <FlatList
                        data={users}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                        refreshing={refreshing}
                        onRefresh={listUsers}
                    />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    titleContainer: {
        padding: 10,
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

    userContainer: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderColor: "#DDD",
        padding: 10,
    },

    userName: {
        color: "#333",
        fontWeight: "bold",
    },

    userEmail: {
        color: "#999",
    },
});