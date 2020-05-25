import jwt from 'jsonwebtoken';

export function login(token) {
	localStorage.setItem('token', token);
}

export function logout() {
	localStorage.clear();
}

export function getToken() {
	return localStorage.getItem('token');
}

export function getTokenData() {
	try {
		return jwt.verify(getToken(), process.env.REACT_APP_SECRET);

	} catch (error) {
		logout();
		window.location = '/';
	}	
}

export function getUserId() {
	const { id } = getTokenData();
	return id;
}