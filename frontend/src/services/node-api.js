import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken, logout } from './auth';

const api = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL
});

api.interceptors.request.use(async config => {
	const token = getToken();

	if (token)
		config.headers.Authorization = `Bearer ${token}`;

	return config;
});

api.interceptors.response.use(
	(response) => {
		return response;
	},

	(error) => {
		if (!error.response || error.response.status === 500) {
			toast.error('Não foi possível se conectar com o servidor.');

		} else if (error.response.status === 401 && getToken()) {
			logout();
			window.location = '/';
		
		} else {
			toast.error(error.response.data.error);
		}

		return Promise.reject(error.response);
	}
);

export default api;