import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import { logout } from '../services/auth';

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
				logout();

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