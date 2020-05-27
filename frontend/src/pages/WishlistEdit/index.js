import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/node-api';
import { getUserId } from '../../services/auth';

import Header from '../../components/Header';
import Input from '../../components/Form/Input';
import ButtonLoading from '../../components/ButtonLoading';

export default function WishlistEdit(props) {
	const [loading, setLoading] = useState(false);

	const formRef = useRef(null);
	const history = useHistory();
	const userId = getUserId();
	const { id } = props.match.params;

	useEffect(() => {
		api.get(`users/${userId}/wishlist/${id}`).then(response => {
			const { name, description, value } = response.data
			
			formRef.current.setData({ 
				name, 
				description, 
				value,
			});

		}).catch(() => {});

	}, [userId, id]);

	async function handleSubmit(data, { reset }) {
		setLoading(true);

		try {
			const schema = Yup.object().shape({
				name: Yup.string()
					.required('Nome obrigatório.'),

				description: Yup.string()
					.required('Descrição obrigatória.'),

				value: Yup.string()
					.required('Valor obrigatório.')
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			const { name, description, value } = data;

			api.put(`users/${userId}/wishlist/${id}`, {
				name,
				description,
				value,
			
			}).then(response => {
				alert('Registro salvo com sucesso.');
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
		<div className="container">
			<Header />
			
			<div className="content">
				<div className="page-title">
					<h1>Lista de desejos</h1>
				</div>

				<Form ref={formRef} onSubmit={handleSubmit}>
					<label>Nome</label>
					<Input name="name" />

					<label>Descrição</label>
					<Input name="description" />

					<label>Valor R$</label>
					<Input type="number" step="0.01" max="9999999" name="value" />

					{!loading ? (
						<button className="button" type="submit">Salvar</button>
					) : (
						<ButtonLoading loading={true} />
					)}
				</Form>

				<Link className="back-link" to="/wishlist">
					<FiArrowLeft size={16} color="#17496E" />
					Voltar
				</Link>
			</div>
		</div>
	);
}