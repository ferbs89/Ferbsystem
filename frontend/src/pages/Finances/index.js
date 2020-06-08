import React, { useState, useEffect } from 'react';
import { FiPlusCircle, FiMinusCircle, FiEdit, FiTrash2 } from 'react-icons/fi';
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

	function handleSearch(e) {
		const search = e.target.value.toLowerCase();
		const newList = finances.filter(finances => finances.description.toLowerCase().includes(search));
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
							<button className="button">Adicionar</button>
						</div>
					</div>
				}

				{!loading && list.length > 0 &&
					<table>
						<thead>
							<tr>
								<th data-header="Data">Data</th>
								<th data-header="Descrição">Descrição</th>
								<th data-header="Valor">Valor</th>
								<th data-header="Editar" className="action">Editar</th>
								<th data-header="Excluir" className="action">Excluir</th>
							</tr>
						</thead>

						<tbody>
							{list.map(item => (
								<tr key={item.id}>
									<td data-header="Data">{item.date}</td>
									<td data-header="Descrição">{item.description}</td>
									<td data-header="Valor">
										{item.type === 'P' ? 
											<span className="value positive">
												<FiPlusCircle />
												{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}
											</span>
										: 
											<span className="value negative">
												<FiMinusCircle />
												{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}
											</span>
										}
									</td>
									<td data-header="Editar" className="action">
										<button type="button">
											<FiEdit />
										</button>
									</td>
									<td data-header="Excluir" className="action">
										<button type="button">
											<FiTrash2 />
										</button>
									</td>
								</tr>
							))}
						</tbody>

						<tfoot>
							<tr>
								<td colSpan="2"><strong>Total</strong></td>
								<td colSpan="3">
									{total > 0 ?
										<span className="value positive"><FiPlusCircle />{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</span>
									:
										<span className="value negative"><FiMinusCircle />{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Math.abs(total))}</span>
									}
									
								</td>
							</tr>
						</tfoot>
					</table>
				}
			</div>
		</div>
	);
}