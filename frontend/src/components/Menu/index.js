import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiBookmark } from 'react-icons/fi';

import './styles.css';

export default function Menu() {
	return (
		<div className="menu">
			<Link to="/finances">
				<FiCalendar size={20} color="#17496E" />
				Controle financeiro
			</Link>

			<Link to="/wishlist">
				<FiBookmark size={20} color="#17496E" />
				Lista de desejos
			</Link>
		</div>
	);
}