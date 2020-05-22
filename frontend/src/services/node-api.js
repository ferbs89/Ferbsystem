import axios from 'axios';

const api = axios.create({
	baseURL: '/api'
});

api.interceptors.request.use(async config => {
	const token = localStorage.getItem('token');

	if (token)
		config.headers.Authorization = `Bearer ${token}`;

	return config;
});

api.interceptors.response.use(
	(response) => {
		return response;
	},

	(error) => {
		if (error.response.status === 500) {
			alert('Não foi possível se conectar com o servidor.');

		} else {
			alert(error.response.data.error);
		}

		return Promise.reject(error.response);
	}
);

export default api;