import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import FadeLoader from 'react-spinners/FadeLoader';

import api from '../../services/node-api';

import './styles.css';
import Header from '../../components/Header';

export default function Wishlist() {
	const [wishlist, setWishlist] = useState([]);
	const [loading, setLoading] = useState(false);

	const history = useHistory();	
	const userId = localStorage.getItem('userId');

	useEffect(() => {
		setLoading(true);

		api.get(`users/${userId}/wishlist`).then(response => {
			setWishlist(response.data);
			setLoading(false);

		}).catch(() => {
			setLoading(false);
		});

	}, [userId]);

	return (
		<div className="container">
			<Header />
			
			<div className="content">
				<div className="page-title">
					<h1>Lista de desejos</h1>
					<button className="button" onClick={() => history.push('/wishlist/new') }>Adicionar</button>
				</div>

				<div className="center">
					<FadeLoader color={"#dcdce6"} loading={loading} />
				</div>

				<ul>
					{wishlist.map(item => (
						<li key={item.id}>
							<strong>{item.name}</strong>
							<p>{item.description}</p>

							<button type="button">
								<FiTrash2 size={20} color="#a8a8b3" />
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}