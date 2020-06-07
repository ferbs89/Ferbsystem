import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import FadeLoader from 'react-spinners/FadeLoader';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/node-api';
import { getUserId } from '../../services/auth';

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Input from '../../components/Form/Input';
import ButtonLoading from '../../components/ButtonLoading';

export default function WishlistForm(props) {
	const [loadingPage, setLoadingPage] = useState(true);
	const [loadingSubmit, setLoadingSubmit] = useState(false);

	const { id } = props.match.params;

	const userId = getUserId();
	const formRef = useRef(null);
	const history = useHistory();	

	useEffect(() => {
		if (!id) {
			setLoadingPage(false);
			return;
		}

		api.get(`users/${userId}/wishlist/${id}`).then(response => {
			const { name, description, value } = response.data
			
			formRef.current.setData({
				name, 
				description, 
				value,
			});

			setLoadingPage(false);

		}).catch(() => {
			history.push('/wishlist');
		});

	}, [userId, id, history]);

	async function handleSubmit(data, { reset }) {
		setLoadingSubmit(true);
		formRef.current.setErrors({});

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
			
			if (!id) {
				api.post(`users/${userId}/wishlist`, {
					name,
					description,
					value,
				
				}).then(response => {
					toast.success('Registro salvo com sucesso.');
					history.push('/wishlist');

				}).catch(() => {
					setLoadingSubmit(false);
				});
			
			} else {
				api.put(`users/${userId}/wishlist/${id}`, {
					name,
					description,
					value,
				
				}).then(response => {
					toast.success('Registro salvo com sucesso.');
					history.push('/wishlist');

				}).catch(() => {
					setLoadingSubmit(false);
				});
			}

		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errorMessages = {};

				err.inner.forEach(error => {
					errorMessages[error.path] = error.message;
				});

				formRef.current.setErrors(errorMessages);
			}

			setLoadingSubmit(false);
		}
	}

	return (
		<div className="container">
			<Header />
			<Menu />
			
			<div className="content">
				<h1>Lista de desejos</h1>

				{loadingPage && id &&
					<div className="center">
						<FadeLoader color={"#dcdce6"} loading={loadingPage} />
					</div>
				}

				<div hidden={loadingPage}>
					<Form ref={formRef} onSubmit={handleSubmit}>
						<label htmlFor="name">Nome</label>
						<Input name="name" id="name" />

						<label htmlFor="description">Descrição</label>
						<Input name="description" id="description" />

						<label htmlFor="value">Valor R$</label>
						<Input type="number" step="0.01" max="99999999" name="value" id="value" />

						{!loadingSubmit ? (
							<button className="button" type="submit">Salvar</button>
						) : (
							<ButtonLoading loading={true} />
						)}
					</Form>

					<Link className="back-link" to="/wishlist">
						<FiArrowLeft />
						Voltar
					</Link>
				</div>
			</div>
		</div>
	);
}