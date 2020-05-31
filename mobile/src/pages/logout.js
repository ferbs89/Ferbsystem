import React, { useEffect } from 'react';

import { logout } from '../services/auth';
import LoadingScreen from '../components/LoadingScreen';

export default function LogoutScreen() {
	useEffect(() => {
		logout();
	}, []);

	return (
		<LoadingScreen />
	);
}