import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import { logout } from '../services/auth';

import logoImg from '../assets/logo@2x.png';

export default function Header() {
    const history = useHistory();

    function handleLogout() {
        logout();

        history.push('/');
    }

    return (
        <header>
            <img src={logoImg} alt="Ferbsystem" />
            <span>Bem-vindo(a), {localStorage.getItem('userName')}.</span>

            <button type="button" onClick={handleLogout}>
                <FiPower size={18} color="#17496E" />
            </button>
        </header>
    );
}