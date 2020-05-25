import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import './styles.css';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Form/Input';

export default function Register() {
	const formRef = useRef(null);

	async function handleSubmit(data, { reset }) {
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

			console.log(data);

			formRef.current.setErrors({});
			reset();
		
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errorMessages = {};

				err.inner.forEach(error => {
					errorMessages[error.path] = error.message;
				});

				formRef.current.setErrors(errorMessages);
			}
		}	
	}
	
	return (
		<div className="register-container">
			<div className="register-content">
				<section>
					<img src={logoImg} alt="Ferbsystem" className="logo" />

					<h1>Criar uma conta</h1>
					<p>Faça seu cadastro para entrar na plataforma.</p>

					<Link className="back-link" to="/">
						<FiArrowLeft size={16} color="#17496E" />
						Voltar para o login
					</Link>
				</section>

				<Form ref={formRef} onSubmit={handleSubmit}>
					<Input name="name" placeholder="Nome" />
					<Input type="email" name="email" placeholder="E-mail" />
					<Input type="password" name="password" placeholder="Senha" />

					<button className="button" type="submit">Cadastrar</button>
				</Form>
			</div>
		</div>
	);
}