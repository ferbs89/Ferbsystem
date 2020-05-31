import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList } from 'react-native';

import api from '../services/node-api';
import styles from '../styles/global';

export default function WishlistScreen({ navigation }) {
	const [wishlist, setWishlist] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		await api.get(`users/1/wishlist`).then(response => {
			setWishlist(response.data);
			setLoading(false);

		}).catch(error => {
			setWishlist([]);
			setLoading(false);
		});		
	}

	function renderHeader() {
		return (
			<View style={styles.pageTitle}>
				<Text style={styles.pageTitleText}>Lista de desejos</Text>
			</View>
		);
	}

	function renderItem({ item }) {
		return (
			<View style={localStyles.itemContainer}>
				<Text style={localStyles.itemName}>{item.name}</Text>
				<Text style={localStyles.itemDescription}>{item.description}</Text>
				<Text style={localStyles.itemDescription}>R$ {item.value}</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{loading ? (
				<ActivityIndicator color="#17496E" size="large" style={{ padding: 16 }} />
			) : (
				<FlatList
					data={wishlist}
					keyExtractor={item => item.id.toString()}
					ListHeaderComponent={renderHeader}
					renderItem={renderItem}
					onRefresh={fetchData}
					refreshing={refreshing}
				/>
			)}
		</View>
	);
}

const localStyles = StyleSheet.create({
	itemContainer: {
		marginHorizontal: 16,
		marginBottom: 16,
		padding: 16,
		backgroundColor: "#FFF",
		borderWidth: 1,
		borderColor: "#dcdce6",
		borderRadius: 8,
	},

	itemName: {
		color: "#41414d",
		fontWeight: "bold",
		marginBottom: 8,
	},

	itemDescription: {
		color: "#737380",
		marginBottom: 8,
	},

	itemValue: {
		color: "#737380",
	},
});