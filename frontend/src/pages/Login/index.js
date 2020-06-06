import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/node-api';
import { login } from '../../services/auth';

import logoImg from '../../assets/logo.png';
import Input from '../../components/Form/Input';
import ButtonLoading from '../../components/ButtonLoading';

export default function Login() {
	const [loading, setLoading] = useState(false);
	
	const formRef = useRef(null);
	const history = useHistory();

	async function handleLogin(data, { reset }) {
		setLoading(true);
		formRef.current.setErrors({});

		try {
			const schema = Yup.object().shape({
				email: Yup.string()
					.email('E-mail inválido.')
					.required('E-mail obrigatório.'),

				password: Yup.string()
					.required('Senha obrigatória.')
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			const { email, password } = data;

			await api.post('login', {
				email,
				password,

			}).then(response => {
				const { token } = response.data;

				login(token);			
				history.push('/wishlist');
				
			}).catch(() => {
				setLoading(false);
			});

		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errorMessages = {};

				err.inner.forEach(error => {
					errorMessages[error.path] = error.message;
				});

				formRef.current.setErrors(errorMessages);
			}

			setLoading(false);
		}	
	}

	return (
		<div className="login-container">
			<div className="login-content">
				<div className="login-logo">
					<img src={logoImg} alt="Ferbsystem" />
				</div>

				<Form ref={formRef} onSubmit={handleLogin}>
					<Input type="email" name="email" placeholder="E-mail" />
					<Input type="password" name="password" placeholder="Senha" />

					{!loading ? (
						<button className="button" type="submit">Entrar</button>
					) : (
						<ButtonLoading loading={true} />
					)}
				</Form>

				<div className="center">
					<Link className="back-link" to="/register">
						<FiLogIn size={20} color="#17496E" />
						Não tenho cadastro
					</Link>
				</div>
			</div>
		</div>
	);
}
