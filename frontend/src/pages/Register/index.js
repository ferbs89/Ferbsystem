import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo@2x.png';

export default function Register() {
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Ferbsystem" />

                    <h1>Criar uma conta</h1>
                    <p>Faça seu cadastro para entrar na plataforma.</p>

                    <Link className="back-link" to="/">
						<FiArrowLeft size={16} color="#17496E" />
						Voltar para o login
					</Link>
                </section>

                <form>
                    <input placeholder="Nome" />
                    <input tyle="email" placeholder="E-mail" />
                    <input type="password" placeholder="Senha" />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}