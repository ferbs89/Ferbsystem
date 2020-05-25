import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import { logout } from '../../services/auth';

import './styles.css';
import logoImg from '../../assets/logo.png';

export default function Header() {
	const history = useHistory();

	function handleLogout() {
		logout();
		history.push('/');
	}

	return (
		<header>
			<img src={logoImg} alt="Ferbsystem" className="logo" />

			<div>
				<span className="name">{localStorage.getItem('userName')}</span>
				<span className="email">{localStorage.getItem('userEmail')}</span>

				<Link to="#" onClick={handleLogout}>
					Sair
					<FiLogOut size={16} color="#17496E" />
				</Link>
			</div>
		</header>
	);
}