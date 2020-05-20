import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo@2x.png';

export default function Login() {
	return (
		<div className="login-container">
			<section className="form">
				<img src={logoImg} alt="Ferbsystem" />

				<form>
					<h1>Login</h1>

					<input placeholder="E-mail" />
					<input type="password" placeholder="Senha" />
					<button className="button" type="submit">Entrar</button>

					<Link className="back-link" to="/register">
						<FiLogIn size={16} color="#17496E" />
						Não tenho cadastro
					</Link>
				</form>
			</section>			
		</div>
	);
}
