import React, {useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/hero.svg';

import herosImg from '../../assets/fazer_login.png';

export default function Login(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();
        
        try{
            const response = await api.post('sessions', {id});
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profille')
        }catch (err){
            alert('falha no login, tente novamente.')
        }
    }
    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input
                        placeholder="Sua Id"
                        value={id}
                        onChange={e => setId(e.target.value)}
                        />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02141"/>
                        Não tenho cadastro
                    </Link>
                </form>

            </section>

            <img className="imagem" src={herosImg} alt="Login"/>
        </div>
    );
}