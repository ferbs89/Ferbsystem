import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';

export default function Drawer(props) {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={localStyles.userContainer}>
				<Text style={localStyles.userName}>Fernando Sanches</Text>
				<Text style={localStyles.userEmail}>ferbs89@gmail.com</Text>
			</View>

			<DrawerItems {...props} />
		</SafeAreaView>
	);
}

const localStyles = StyleSheet.create({
	userContainer: {
		padding: 16,
		borderBottomWidth: 1,
		borderColor: '#dcdce6',
	},

	userName: {
		fontSize: 18,
		fontWeight: "bold",
	},

	userEmail: {
		color: "#737380",
	},
});