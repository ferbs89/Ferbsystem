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

export function getSession() {
	if (!getToken())
		return false;

	return jwt.verify(getToken(), process.env.REACT_APP_SECRET,
		function(error, decoded) {
			return (error) ? (false) : (decoded);
		}
	);
}

export function getUserId() {
	const { id } = getSession();
	return id;
}