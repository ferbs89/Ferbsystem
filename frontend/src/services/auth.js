export function login(user, token) {
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('token', token);
}

export function logout() {
    localStorage.clear();
}

export function isAuth() {
    return (localStorage.getItem('token') !== null);
}

export function getToken() {
    return localStorage.getItem('token');
}