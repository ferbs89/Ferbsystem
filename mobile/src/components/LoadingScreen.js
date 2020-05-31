import React from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';

import logoImg from '../assets/logo.png';

export default function LoadingScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View style={styles.logo}>
					<Image source={logoImg} />
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
        padding: 16,
    },

    content: {
        backgroundColor: '#FFF',
		borderRadius: 8,
		padding: 16,
    },

    logo: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 16,
	},
});