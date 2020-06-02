import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../services/navigation';

// import jwt from 'jsonwebtoken';

export async function login(token) {
	await AsyncStorage.setItem('token', token);
	NavigationService.navigate('WishlistScreen');
}

export async function logout() {
	await AsyncStorage.removeItem('token');
	NavigationService.navigate('LoginScreen');
}

export async function getToken() {
	return await AsyncStorage.getItem('token');
}

// export function getSession() {
// 	if (!getToken())
// 		return false;

// 	return jwt.verify(getToken(), process.env.REACT_APP_SECRET,
// 		function(error, decoded) {
// 			return (error) ? (false) : (decoded);
// 		}
// 	);
// }

// export function getUserId() {
// 	const { id } = getSession();
// 	return id;
// }