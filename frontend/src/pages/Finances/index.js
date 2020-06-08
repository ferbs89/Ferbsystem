import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPlusCircle, FiMinusCircle, FiEdit, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import FadeLoader from 'react-spinners/FadeLoader';

import api from '../../services/node-api';
import { getUserId } from '../../services/auth';

import './styles.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

export default function Finances() {
	const [finances, setFinances] = useState([]);
	const [list, setList] = useState([]);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(true);

	const userId = getUserId();
	const history = useHistory();

	useEffect(() => {
		api.get(`users/${userId}/finances`).then(response => {
			const totalValue = calculateTotal(response.data);
			
			setFinances(response.data);
			setList(response.data);
			setTotal(totalValue);
			setLoading(false);

		}).catch(() => {
			setLoading(false);
		});
	}, [userId]);

	async function handleDelete(id) {
		await api.delete(`finances/${id}`).then(response => {
			const updatedList = finances.filter(finance => finance.id !== id);
			const totalValue = calculateTotal(updatedList);

			setFinances(updatedList);
			setList(updatedList);
			setTotal(totalValue);

			toast.success('Registro excluído com sucesso.');

		}).catch(() => {});
	}

	function handleSearch(e) {
		const search = e.target.value.toLowerCase();
		const newList = finances.filter(finance => finance.description.toLowerCase().includes(search));
		const totalValue = calculateTotal(newList);

		setList(newList);
		setTotal(totalValue);
	}

	function calculateTotal(data) {
		let total = 0;

		data.forEach(item => {
			if (item.type === 'P')
				total += Number(item.value);
			else
				total -= Number(item.value);
		});

		return total;
	}

	return (
		<div className="container">
			<Header />
			<Menu />
			
			<div className="content">
				<h1>Controle financeiro</h1>

				{loading &&
					<div className="center">
						<FadeLoader color={"#dcdce6"} loading={loading} />
					</div>
				}

				{!loading &&
					<div className="page-title">
						<input type="text" name="search" placeholder="Pesquisar" onChange={handleSearch} autoComplete="off" />
						<div className="right">
							<button className="button" onClick={() => history.push('/finances/new') }>Adicionar</button>
						</div>
					</div>
				}

				{!loading && list.length > 0 &&
					<table>
						<thead>
							<tr>
								<th>Data</th>
								<th>Descrição</th>
								<th>Valor</th>
								<th className="action">Editar</th>
								<th className="action">Excluir</th>
							</tr>
						</thead>

						<tbody>
							{list.map(item => (
								<tr key={item.id}>
									<td data-header="Data">{item.date}</td>
									<td data-header="Descrição">{item.description}</td>
									<td data-header="Valor">
										<span className={item.type === 'P' ? 'value positive' : 'value negative'}>
											{item.type === 'P' ? <FiPlusCircle /> : <FiMinusCircle />}
											{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}
										</span>
									</td>
									<td data-header="Editar" className="action">
										<button type="button" onClick={() => history.push(`/finances/${item.id}`)}>
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

						<tfoot>
							<tr>
								<td colSpan="2">Total</td>
								<td colSpan="3">
									<span className={total > 0 ? 'value positive' : 'value negative'}>
										{total > 0 ? <FiPlusCircle /> : <FiMinusCircle />}
										{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Math.abs(total))}
									</span>
								</td>
							</tr>
						</tfoot>
					</table>
				}
			</div>
		</div>
	);
}