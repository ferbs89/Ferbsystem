import React, { useEffect } from 'react';

import { getToken } from './services/auth';
import LoadingScreen from './components/LoadingScreen';

export default function SessionScreen({ navigation }) {
	useEffect(() => {
		navigation.navigate(getToken() ? 'WishlistScreen' : 'LoginScreen');
	}, []);

	return (
		<LoadingScreen />
	);
}