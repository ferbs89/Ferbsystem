import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/node-api';
import { login } from '../../services/auth';

import './styles.css';
import logoImg from '../../assets/logo@2x.png';

export default function Login() {
	const [email, setEmail] = useState('ferbs89@gmail.com');
	const [password, setPassword] = useState('');
	
	const history = useHistory();

	async function handleLogin(e) {
		e.preventDefault();

		await api.post('login', {
            email,
            password,

        }).then(response => {
			const { user, token } = response.data;

			login(user, token);
			
			history.push('/wishlist');
			
		}).catch(() => {
			
		});
	}

	return (
		<div className="login-container">
			<div className="content">
				<div className="center">
					<img src={logoImg} alt="Ferbsystem" />
				</div>

				<form onSubmit={handleLogin}>
					<input
						type="email"
						placeholder="E-mail"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>

					<input 
						type="password"
						placeholder="Senha"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>

					<button className="button" type="submit">Entrar</button>
				</form>

				<div className="center">
					<Link className="back-link" to="/register">
						<FiLogIn size={16} color="#17496E" />
						Não tenho cadastro
					</Link>
				</div>
			</div>
		</div>
	);
}
