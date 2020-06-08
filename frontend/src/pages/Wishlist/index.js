import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import FadeLoader from 'react-spinners/FadeLoader';

import api from '../../services/node-api';
import { getUserId } from '../../services/auth';

import Header from '../../components/Header';
import Menu from '../../components/Menu';

export default function Wishlist() {
	const [wishlist, setWishlist] = useState([]);
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(true);

	const userId = getUserId();
	const history = useHistory();

	useEffect(() => {
		api.get(`users/${userId}/wishlist`).then(response => {
			setWishlist(response.data);
			setList(response.data);
			setLoading(false);

		}).catch(() => {
			setLoading(false);
		});
	}, [userId]);

	async function handleDelete(id) {
		await api.delete(`wishlist/${id}`).then(response => {
			const updatedList = wishlist.filter(wishlist => wishlist.id !== id);

			setWishlist(updatedList);
			setList(updatedList);

			toast.success('Registro excluído com sucesso.');

		}).catch(() => {});
	}

	function handleSearch(e) {
		const search = e.target.value.toLowerCase();

		setList(wishlist.filter(wishlist => wishlist.name.toLowerCase().includes(search)));
	}

	return (
		<div className="container">
			<Header />
			<Menu />
			
			<div className="content">
				<h1>Lista de desejos</h1>

				{loading &&
					<div className="center">
						<FadeLoader color={"#dcdce6"} loading={loading} />
					</div>
				}

				{!loading &&
					<div className="page-title">
						<input type="text" name="search" placeholder="Pesquisar" onChange={handleSearch} autoComplete="off" />
						<div className="right">
							<button className="button" onClick={() => history.push('/wishlist/new') }>Adicionar</button>
						</div>
					</div>
				}

				{!loading && list.length > 0 &&
					<table>
						<thead>
							<tr>
								<th data-header="Nome">Nome</th>
								<th data-header="Descrição">Descrição</th>
								<th data-header="Valor">Valor</th>
								<th data-header="Editar" className="action">Editar</th>
								<th data-header="Excluir" className="action">Excluir</th>
							</tr>
						</thead>

						<tbody>
							{list.map(item => (
								<tr key={item.id}>
									<td data-header="Nome">{item.name}</td>
									<td data-header="Descrição">{item.description}</td>
									<td data-header="Valor">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}</td>
									<td data-header="Editar" className="action">
										<button type="button" onClick={() => history.push(`/wishlist/${item.id}`)}>
											<FiEdit />
										</button>
									</td>
									<td data-header="Excluir" className="action">
										<button type="button" onClick={() => handleDelete(item.id)}>
											<FiTrash2 />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				}
			</div>
		</div>
	);
}