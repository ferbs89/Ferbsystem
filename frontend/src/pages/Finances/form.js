import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPlusCircle, FiMinusCircle, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import FadeLoader from 'react-spinners/FadeLoader';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/node-api';
import { getUserId } from '../../services/auth';

import './styles.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Input from '../../components/Form/Input';
import ButtonLoading from '../../components/ButtonLoading';

export default function WishlistForm(props) {
	const [loadingPage, setLoadingPage] = useState(true);
	const [loadingSubmit, setLoadingSubmit] = useState(false);
	const [type, setType] = useState('');

	const { id } = props.match.params;

	const userId = getUserId();
	const formRef = useRef(null);
	const history = useHistory();	

	useEffect(() => {
		if (!id) {
			setLoadingPage(false);
			return;
		}

		api.get(`users/${userId}/finances/${id}`).then(response => {
			const { type, value, description } = response.data

			const dateParts = response.data.date.split('/');
			const date = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0]; 

			formRef.current.setData({
				value, 
				date, 
				description,
			});

			setType(type);
			setLoadingPage(false);

		}).catch(() => {
			history.push('/finances');
		});
	}, [userId, id, history]);
	
	async function handleSubmit(data, { reset }) {
		if (type === '') {
			toast.error('Selecione a opção receita ou despesa.');
			return;
		}

		setLoadingSubmit(true);
		formRef.current.setErrors({});

		try {
			const schema = Yup.object().shape({
				value: Yup.number()
					.typeError('Valor obrigatório.'),

				date: Yup.date()
					.typeError('Data obrigatória.'),

				description: Yup.string()
					.required('Descrição obrigatória.')				
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			const { value, date, description } = data;

			if (!id) {
				api.post(`users/${userId}/finances`, {
					type,
					value,
					date,
					description,
				
				}).then(response => {
					toast.success('Registro salvo com sucesso.');
					history.push('/finances');

				}).catch(() => {
					setLoadingSubmit(false);
				});

			} else {
				api.put(`users/${userId}/finances/${id}`, {
					type,
					value,
					date,
					description,
				
				}).then(response => {
					toast.success('Registro salvo com sucesso.');
					history.push('/finances');

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
				<h1>Controle financeiro</h1>

				{loadingPage && id &&
					<div className="center">
						<FadeLoader color={"#dcdce6"} loading={loadingPage} />
					</div>
				}

				<div hidden={loadingPage}>
					<Form ref={formRef} onSubmit={handleSubmit}>
						<div className="type-container">
							<div className={type === 'P' ? 'type type-positive' : 'type type-off'} onClick={() => setType('P')}>
								<FiPlusCircle />
								Receita
							</div>

							<div className={type === 'N' ? 'type type-negative' : 'type type-off'} onClick={() => setType('N')}>
								<FiMinusCircle />
								Despesa
							</div>
						</div>

						<label htmlFor="value">Valor</label>
						<Input type="number" step="0.01" max="99999999" name="value" id="value" />

						<label htmlFor="date">Data</label>
						<Input type="date" name="date" id="date" />

						<label htmlFor="description">Descrição</label>
						<Input name="description" id="description" />

						{!loadingSubmit ? (
							<button className="button" type="submit">Salvar</button>
						) : (
							<ButtonLoading loading={true} />
						)}
					</Form>

					<Link className="back-link" to="/finances">
						<FiArrowLeft />
						Voltar
					</Link>
				</div>
			</div>
		</div>
	);
}