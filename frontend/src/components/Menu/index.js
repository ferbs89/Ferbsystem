import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiBookmark } from 'react-icons/fi';

import './styles.css';

export default function Menu() {
	return (
		<div className="menu">
			<Link to="/finances">
				<FiCalendar />
				Controle financeiro
			</Link>

			<Link to="/wishlist">
				<FiBookmark />
				Lista de desejos
			</Link>
		</div>
	);
}