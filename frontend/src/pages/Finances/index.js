import React from 'react';
import { FiPlusCircle, FiMinusCircle, FiCheckCircle, FiEdit, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

export default function Finances() {
	return (
		<div className="container">
			<Header />
			<Menu />
			
			<div className="content">
				<div className="page-title">
					<h1>Controle financeiro</h1>
					<div className="right">
						<input type="text" name="search" placeholder="Pesquisar" autoComplete="off" />
						<button className="button">Adicionar</button>
					</div>
				</div>

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
						<tr>
							<td data-header="Data">10/01/2020</td>
							<td data-header="Descrição">Compra de ações ITSA3</td>
							<td data-header="Valor"><span className="value positive"><FiPlusCircle size={16} color="#080" />R$ 1109,00</span></td>
							<td data-header="Editar" className="action"><FiEdit size={20} color="#a8a8b3" /></td>
							<td data-header="Excluir" className="action"><FiTrash2 size={20} color="#a8a8b3" /></td>
						</tr>

						<tr>
							<td data-header="Data">05/06/2020</td>
							<td data-header="Descrição">Venda de ações ITSA3</td>
							<td data-header="Valor"><span className="value negative"><FiMinusCircle size={16} color="#F00" />R$ 1170,00</span></td>
							<td data-header="Editar" className="action"><FiEdit size={20} color="#a8a8b3" /></td>
							<td data-header="Excluir" className="action"><FiTrash2 size={20} color="#a8a8b3" /></td>
						</tr>
					</tbody>

					<tfoot>
						<tr>
							<td colSpan="2"></td>
							<td data-header="Total" className="total"><span className="value"><FiCheckCircle size={16} color="#05111a" />R$ 61,00</span></td>
							<td colSpan="2"></td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	);
}