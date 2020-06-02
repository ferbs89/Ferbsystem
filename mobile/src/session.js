import React, { useEffect } from 'react';

import { getToken } from './services/auth';
import LoadingScreen from './components/LoadingScreen';

export default function SessionScreen({ navigation }) {
	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		const token = await getToken();
		navigation.navigate(token ? 'WishlistScreen' : 'LoginScreen');
	}

	return (
		<LoadingScreen />
	);
}