import React, {useState} from 'react';
import {Link , useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';
import logoImg from '../../assets/hero.svg';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescritption] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ong_id = localStorage.getItem('ongId')

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };
        try{
            await api.post('incidents', data, {
                headers: {
                    Authorization: ong_id,
                }
            })
            
         history.push('/profille');
           
        }catch(err){
            alert('Erro ao cadastrar caso, tente novamente.')
        }

    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p> Descreva o caso detalhadamente para encontrar uma pessoa para resolver o problema.</p>

                    <Link className="back-link" to="/profille">
                        <FiArrowLeft size={16} color="#E02141"/>
                        Voltar para home
                    </Link>

                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                    placeholder="title" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                    placeholder="Descrição" 
                    value={description}
                    onChange={e => setDescritption(e.target.value)}
                    />
                    <input 
                    placeholder="Valor em reais" 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    />

                    
                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}