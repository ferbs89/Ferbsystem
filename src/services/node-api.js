import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import { Logout } from '../helpers/logout';

const api = axios.create({
	baseURL: 'https://ferbs89.herokuapp.com/api'
});

api.interceptors.request.use(async config => {
	const token = await AsyncStorage.getItem('token');

	if (token)
		config.headers.Authorization = `Bearer ${token}`;

	return config;
});

api.interceptors.response.use(
	(response) => {
		return response;
	},

	async (error) => {
		if (error.response) {
			if (error.response.status == 401) {
				Alert.alert(null, 'Sua sessão expirou.');
				Logout();

			} else {
				Alert.alert(null, error.response.data.error);
			}

		} else {
			Alert.alert(null, 'Não foi possível carregar os dados.');
		}

		return Promise.reject(error);
	}
);

export default api;