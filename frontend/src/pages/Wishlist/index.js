import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import FadeLoader from 'react-spinners/FadeLoader';

import api from '../../services/node-api';
import { getUserId } from '../../services/auth';

import './styles.css';
import Header from '../../components/Header';

export default function Wishlist() {
	const [wishlist, setWishlist] = useState([]);
	const [loading, setLoading] = useState(true);

	const userId = getUserId();
	const history = useHistory();

	useEffect(() => {
		api.get(`users/${userId}/wishlist`).then(response => {
			setWishlist(response.data);
			setLoading(false);

		}).catch(() => {
			setLoading(false);
		});
	}, [userId]);

	async function handleDelete(id) {
		await api.delete(`wishlist/${id}`).then(response => {
			setWishlist(wishlist.filter(wishlist => wishlist.id !== id));
			toast.success('Registro excluído com sucesso.');

		}).catch(() => {});
	}

	return (
		<div className="container">
			<Header />
			
			<div className="content">
				<div className="page-title">
					<h1>Lista de desejos</h1>
					{!loading &&
						<button className="button" onClick={() => history.push('/wishlist/new') }>Adicionar</button>
					}
				</div>

				{loading &&
					<div className="center">
						<FadeLoader color={"#dcdce6"} loading={loading} />
					</div>
				}

				<ul>
					{wishlist.map(item => (
						<li key={item.id}>
							<strong>{item.name}</strong>
							<p>{item.description}</p>
							<p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}</p>

							<button type="button" onClick={() => history.push(`/wishlist/${item.id}`)}>
								<FiEdit size={20} color="#a8a8b3" />
							</button>

							<button type="button" onClick={() => handleDelete(item.id)}>
								<FiTrash2 size={20} color="#a8a8b3" />
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}