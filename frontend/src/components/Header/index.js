import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import { getSession, logout } from '../../services/auth';

import './styles.css';
import logoImg from '../../assets/logo.png';

export default function Header() {
	const { name, email } = getSession();
	const history = useHistory();

	function handleLogout() {
		logout();
		history.push('/');
	}

	return (
		<header>
			<div className="brand">
				<img src={logoImg} alt="Ferbsystem" />
			</div>

			<div className="profile">
				<div className="user">
					<span className="name">{name}</span>
					<span className="email">{email}</span>
				</div>

				<Link to="" onClick={handleLogout}>
					Sair
					<FiLogOut />
				</Link>
			</div>
		</header>
	);
}