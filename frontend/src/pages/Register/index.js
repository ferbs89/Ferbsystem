import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/node-api';

import logoImg from '../../assets/logo.png';
import Input from '../../components/Form/Input';
import ButtonLoading from '../../components/ButtonLoading';

export default function Register() {
	const [loading, setLoading] = useState(false);

	const formRef = useRef(null);
	const history = useHistory();

	async function handleSubmit(data, { reset }) {
		setLoading(true);

		try {
			const schema = Yup.object().shape({
				name: Yup.string()
					.required('Nome obrigatório.'),

				email: Yup.string()
					.email('E-mail inválido.')
					.required('E-mail obrigatório.'),

				password: Yup.string()
					.min(6, 'A senha deve ter no mínimo 6 caracteres.')
					.required('Senha obrigatória.')
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			const { name, email, password } = data;

			api.post('users', {
				name,
				email,
				password,
			
			}).then(response => {
				alert('Usuário cadastrado com sucesso.');
				history.push('/');

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

				<h1>Criar uma conta</h1>
				<p>Faça seu cadastro para entrar na plataforma.</p>

				<Form ref={formRef} onSubmit={handleSubmit}>
					<Input name="name" placeholder="Nome" />
					<Input type="email" name="email" placeholder="E-mail" />
					<Input type="password" name="password" placeholder="Senha" />

					{!loading ? (
						<button className="button" type="submit">Cadastrar</button>
					) : (
						<ButtonLoading loading={true} />
					)}
				</Form>

				<div className="center">
					<Link className="back-link" to="/">
						<FiArrowLeft size={16} color="#17496E" />
						Voltar para o login
					</Link>
				</div>
			</div>
		</div>
	);
}