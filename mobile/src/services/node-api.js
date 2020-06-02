import axios from 'axios';
import { Alert } from 'react-native';
import { getToken, logout } from '../services/auth';

const api = axios.create({
	baseURL: 'https://ferbs89.herokuapp.com/api'
});

api.interceptors.request.use(async config => {
	const token = await getToken();

	if (token)
		config.headers.Authorization = `Bearer ${token}`;

	return config;
});

api.interceptors.response.use(
	async (response) => {
		return response;
	},

	async (error) => {
		if (!error.response || error.response.status === 500) {
			Alert.alert(null, 'Não foi possível se conectar com o servidor.');

		} else if (error.response.status === 401 && await getToken()) {
			await logout();
		
		} else {
			Alert.alert(null, error.response.data.error);
		}

		return Promise.reject(error.response);
	}
);

export default api;